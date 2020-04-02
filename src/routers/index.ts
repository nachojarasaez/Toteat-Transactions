import { Router } from 'express';
import createWaiter from './post/createWaiter'
import getAllWaiters from './get/getAllWaiters'



const appRouter: any = Router();


//Get Methods
appRouter.get('/waiters', getAllWaiters);


//Post Methods


appRouter.post('/createWaiter', createWaiter);


//Patch Methods



export default appRouter;
