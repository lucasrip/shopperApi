
import express from 'express';
import cors from 'cors';
import limiter from './rateLimite';
import helmet from 'helmet';

import routeNotFound from './routeNotFound';

const midwareApp = express();

midwareApp.use(cors({
    origin: '*'
}));

midwareApp.use(express.json());
midwareApp.use(helmet());
// midwareApp.use(limiter);

export default midwareApp;