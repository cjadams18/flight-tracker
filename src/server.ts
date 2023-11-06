import { app } from './app';

const port: number = 3000;

app.listen(port, () => {
	console.log(`App listening on port [${port}]`);
});

process.on('uncaughtException', (error: Error, origin: NodeJS.UncaughtExceptionOrigin) => {
	console.error(`Uncaught Exception\n\tError: ${error.message}\n\tOrigin: ${origin}`);

	process.exit(1);
});
