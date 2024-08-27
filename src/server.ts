import express from 'express';
import routes from "./routes"
import midwareApp from './middlewares/index';
import errorHandler from './middlewares/errorHandler';
import routeNotFound from './middlewares/routeNotFound';

const port = process.env.Port || 3001;
const app = express();


app.use(midwareApp);
app.use(routes);
app.use(errorHandler);
app.use('*',routeNotFound)



app.listen(port,()=>console.log("server is running"));