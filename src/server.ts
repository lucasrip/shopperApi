import express from 'express';
import routes from "./routes"
import midwareApp from './middlewares/index';
import errorHandler from './middlewares/errorHandler';
import routeNotFound from './middlewares/routeNotFound';

const app = express();
const port = process.env.Port || 3001;


app.use(midwareApp);
app.use("/v1",routes);
app.use(errorHandler);
app.use('*',routeNotFound)
app.listen(port,()=>console.log("server is running"));