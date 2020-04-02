import { prisma } from '../../../prisma/generated/prisma-client';

const getAllWaiters: any = async (req: any, res: any) => {
    try {
      const userInfo: any = await prisma.waiters();
      res.status(200).json(userInfo);
    
    } catch (err) {
      console.error('Ocurrió un error', err);
      res.status(500).json({error: err.message});
    }
  };

  export default getAllWaiters