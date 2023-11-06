import { config } from '@config';
import { logger } from '@helpers/logger';
import morgan, { StreamOptions } from 'morgan';

/**
 * Override default output stream.
 * Use our application's logger, not console logs.
 */
const stream: StreamOptions = {
	write: (message: string): void => {
		logger.http(message);
	},
};

/**
 * Function to determine if middleware logging is skipped.
 * Http logs will only print in development environment.
 * @returns boolean
 */
const skip = (): boolean => {
	const env: string = config.APPLICATION.ENVIRONMENT || 'development';
	return env !== 'development';
};

/**
 * Build the morgan middleware.
 * Using default format with predefined tokens.
 * Passing our custom functions as Options.
 */
const morganMiddleware = morgan(':method :url :status: res[content-length] -:response-time ms', { stream, skip });

export default morganMiddleware;
