import { prisma } from '../../../../prisma/generated/prisma-client';

const productStadistics: any = async (req: any, res: any) => {
    try {
        var stadistic : any = {product:{}, category:{}}
        let {year, month, day} = req.query
        if (year){
          if(month){
            if(day){
              initialDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day)-1)
              terminalDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
            }
            else{
            initialDate = new Date(parseInt(year), parseInt(month)-1, 1)
            terminalDate = new Date(parseInt(year), parseInt(month), 1)
          }}
          else{
            initialDate = new Date(parseInt(year), 0, 1)
            terminalDate = new Date(parseInt(year)+1, 0, 1)
          }
        }
        else{
          initialDate = new Date(2019, 0, 1)
          terminalDate = new Date(2020, 4, 1)
        }
        const transactions: any = await prisma.transactions().$fragment(`
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
        var initialDate;
        var terminalDate;
        var productDate;
        for (let trans of transactions){
          productDate = new Date(trans['dateOpen'])
          if (initialDate.valueOf() < productDate.valueOf() && terminalDate.valueOf() > productDate.valueOf()){
            console.log(productDate)
          for (let product of trans.products){
            product.name in stadistic.product? stadistic.product[product.name]['quantity'] += 1 : 
            stadistic.product[product.name] = {'price':product.price, 'quantity':1, 'category': product.category};
          }
        }}
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