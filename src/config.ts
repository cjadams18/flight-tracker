import dotenv from 'dotenv';
dotenv.config();

const config = {
	APPLICATION: {
		ENVIRONMENT: process.env['NODE_ENV'] || 'development',
		PORT: process.env['PORT'] || 3000,
	},
	LOGGING: {
		LEVEL: process.env['LOG_LEVEL'] || 'debug',
		PATH_INFO: String(process.env['PATH_INFO']),
		PATH_ERROR: String(process.env['PATH_ERROR']),
	},
};

export { config };
