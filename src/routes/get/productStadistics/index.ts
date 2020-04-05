import { prisma } from '../../../../prisma/generated/prisma-client';

const productStadistics: any = async (req: any, res: any) => {
    try {
        var stadistic : any = {product:{}, category:{}}
        let {month, day} = req.query
        var initialDate;
        var terminalDate;
          if(month){
            if(day){
              initialDate = new Date(2019, parseInt(month)-1, parseInt(day)-1)
              terminalDate = new Date(2019, parseInt(month)-1, parseInt(day))
            }
            else{
            initialDate = new Date(2019, parseInt(month)-1, 1)
            terminalDate = new Date(2019, parseInt(month), 1)
          }}
          else{
            initialDate = new Date(2019, 0, 1)
            terminalDate = new Date(2019+1, 0, 1)
          }
  
        if(month){
          const transactions:any = await prisma.transactions().$fragment(`
          fragment waiter on transaction{
              id
              clientName
              total
              dateOpen
              products{
                name
                category
                quantity
                price
              }
  
          }
          `);
          for (let trans of transactions){
            var productDate = new Date(trans['dateOpen'])
            if (initialDate.valueOf() < productDate.valueOf() && terminalDate.valueOf() > productDate.valueOf()){
            for (let product of trans.products){
              product.name in stadistic.product? stadistic.product[product.name]['quantity'] += 1 : 
              stadistic.product[product.name] = {'price':product.price, 'quantity':1, 'category': product.category};
            }
          }}
        }
        else{
          const products :any =await prisma.products()
          for (let product of products){
            product.name in stadistic.product? stadistic.product[product.name]['quantity'] += 1 : 
            stadistic.product[product.name] = {'price':product.price, 'quantity':1, 'category': product.category};
          }
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