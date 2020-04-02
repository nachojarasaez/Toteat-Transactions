import { prisma } from '../../../prisma/generated/prisma-client';

const createProduct: any = async(req: any, res: any) => {
  const {product} = req.body;
  let newProduct: any;
  
  try {
    newProduct = await prisma.createProduct(product);
  } catch (e) {
    res.status(500).send(e);
    return;
  }
  res.status(200).json(newProduct);
};
export default createProduct
