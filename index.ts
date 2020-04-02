import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import logger from 'morgan';
dotenv.config();
import appRouter from './src/routers';



const { PORT = 4400} = process.env;

const allowControlOrigin = (req: any, res: any, next: any): void => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

const app = express();
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(allowControlOrigin);
// Configurar las rutas de la aplicación
app.use('/app', appRouter);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${ PORT }`)
);

