import { prisma } from '../../../prisma/generated/prisma-client';

const createTransaction: any = async(req: any, res: any) => {
  const {transaction} = req.body;
  let newTransaction: any;
  
  try {
    newTransaction = await prisma.createTransaction(transaction);
  } catch (e) {
    res.status(500).send(e);
    return;
  }
  res.status(200).json(newTransaction);
};
export default createTransaction
