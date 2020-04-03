import { prisma } from '../../../../prisma/generated/prisma-client';

const productStadistics: any = async (req: any, res: any) => {
    try {
        var stadistic : any = {product:{}, category:{}}
        const products: any = await prisma.products();
        for (let product of products){
            product.name in stadistic.product? stadistic.product[product.name]['quantity'] += 1 : 
            stadistic.product[product.name] = {'price':product.price, 'quantity':1, 'category': product.category};
        }
        for (let prod in stadistic.product){
            stadistic.product[prod]['total'] = stadistic.product[prod].price*stadistic.product[prod].quantity
            stadistic.product[prod].category in stadistic.category? stadistic.category[stadistic.product[prod].category]  += stadistic.product[prod]['total']: stadistic.category[stadistic.product[prod].category]  = stadistic.product[prod]['total']
          }
        res.status(200).json(stadistic);
    } catch (err) {
        console.error('Ocurrió un error', err);
        res.status(500).json({error: err.message});
      }
    };
  
    export default productStadistics