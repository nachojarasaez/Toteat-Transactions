import { prisma } from '../../../prisma/generated/prisma-client';

const createPayment: any = async(req: any, res: any) => {
  const {payment} = req.body;
  let newPayment: any;
  
  try {
    newPayment = await prisma.createPayment(payment);
  } catch (e) {
    res.status(500).send(e);
    return;
  }
  res.status(200).json(newPayment);
};
export default createPayment