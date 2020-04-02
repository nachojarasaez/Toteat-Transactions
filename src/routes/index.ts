import { Router } from 'express';
import * as MW from '../middleware/index';
import createWaiter from './post/createWaiter'
import getAllWaiters from './get/getAllWaiters'
import createProduct from './post/createProduct'
import createPayment from './post/createPayment'
import createTransaction from './post/createTransaction'
import inizializeDataBase from './post/inizializeDataBase'



const appRouter: any = Router();
const utilMW = new MW.utilMiddleware();


//Get Methods
appRouter.get('/waiters', getAllWaiters);


//Post Methods


appRouter.post('/newWaiter', createWaiter);
appRouter.post('/newProduct', createProduct);
appRouter.post('/newPayment', createPayment);
appRouter.post('/newTransaction', createTransaction);
appRouter.post('/inizialize', utilMW.getData,inizializeDataBase);



//Patch Methods



export default appRouter;
