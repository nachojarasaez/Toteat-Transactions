import { Router } from 'express';
import * as MW from '../middleware/index';
import getAllWaiters from './get/getAllWaiters'



const appRouter: any = Router();
const utilMW = new MW.utilMiddleware();


//Get Methods
appRouter.get('/waiters', getAllWaiters);


//Post Methods


//Patch Methods



export default appRouter;
