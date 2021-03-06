import { Router } from 'express';
import * as MW from '../middleware/index';
import workerStadistics from './get/workerStadistics';
import productStadistics from './get/productStadistics';
import generalStadistics from './get/generalStadistics';



const appRouter: any = Router();
const utilMW = new MW.utilMiddleware();


//Get Methods
appRouter.get('/stadistics/workers', workerStadistics);
appRouter.get('/stadistics/products', productStadistics);
appRouter.get('/stadistics/generals', generalStadistics);


//Post Methods


//Patch Methods



export default appRouter;
