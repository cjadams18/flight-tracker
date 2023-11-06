import { config } from '@config';
import winston, { Logger } from 'winston';
import 'winston-daily-rotate-file';

/**
 * Define logging levels our logger will utilize.
 */
const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

/**
 * Define logging level based on application's environment.
 */
const level = (): string => {
	const env: string = config.APPLICATION.ENVIRONMENT || 'development';
	const isDevelopment: boolean = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

/**
 * Associate unique color with each logging level.
 */
const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'blue',
};

winston.addColors(colors);

/**
 * Define formatting for file logs.
 */
const fileLogFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.metadata({
		fillExcept: ['message', 'level', 'timestamp', 'label'],
	})
);

/**
 * Define formatting for console logs.
 */
const consoleLogFormat = winston.format.combine(
	winston.format.colorize({ all: true }),
	winston.format.printf((info: winston.Logform.TransformableInfo) => `${info['timestamp']} ${info.level} : ${info.message}`)
);

/**
 * Define two log files: one for all log output, and another for errors.
 * A new instance of each file will be created daily.
 */
const transports = [
	new winston.transports.DailyRotateFile({
		datePattern: 'YYYY-MM-DD',
		filename: `${config.LOGGING.PATH_INFO}/all-%DATE%.log`,
		format: winston.format.json(),
		level: config.LOGGING.LEVEL,
		maxSize: 512000,
	}),
	new winston.transports.DailyRotateFile({
		datePattern: 'YYYY-MM-DD',
		filename: `${config.LOGGING.PATH_ERROR}/error-%DATE%.log`,
		format: winston.format.json(),
		level: 'error',
		maxSize: 512000,
	}),
];

/**
 * Create logger. A new instance is created upon import.
 */
const logger: Logger = winston.createLogger({
	level: level(),
	levels: levels,
	format: fileLogFormat,
	transports: transports,
});

/**
 * Add console logging for non-production environment.
 */
if (config.APPLICATION.ENVIRONMENT !== 'production') {
	logger.add(
		new winston.transports.Console({
			level: config.LOGGING.LEVEL,
			format: consoleLogFormat,
		})
	);
}

export { logger };
