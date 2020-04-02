import { prisma } from '../../../prisma/generated/prisma-client';

const createWaiter: any = async(req: any, res: any) => {
  const {waiter} = req.body;
  let newWaiter: any;
  
  try {
    newWaiter = await prisma.createWaiter(waiter);
  } catch (e) {
    res.status(500).send(e);
    return;
  }
  res.status(200).json(newWaiter);
};
export default createWaiter
