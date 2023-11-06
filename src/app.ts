import httpRequestLogging from '@middleware/httpRequestLogging';
import routes from '@routes/index';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpRequestLogging);

app.use('/api/v1/', routes);
app.use('*', (_req: Request, res: Response) => res.sendStatus(404));

export { app };
