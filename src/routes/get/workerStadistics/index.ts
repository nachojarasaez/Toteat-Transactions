import { prisma } from '../../../../prisma/generated/prisma-client';

const workerStadistics: any = async (req: any, res: any) => {
    try {
        var stadistic : any = {waiter : {}, cashier :{}}
        const transactions: any = await prisma.transactions().$fragment(`
        fragment waiter on transaction{
            id
            clientName
            total
            waiter{
                id
                name
            }
            products{
              name
              category
              quantity
              price
            }

        }
        `);
      for (let trans of transactions) {
        trans.waiter.name in stadistic.waiter? stadistic.waiter[trans.waiter.name]['quantity'] += 1 : stadistic.waiter[trans.waiter.name] = {'total':trans.total, 'quantity':1};
        trans.waiter.name in stadistic.waiter? stadistic.waiter[trans.waiter.name]['total'] += trans.total : true;

        trans.clientName in stadistic.cashier? stadistic.cashier[trans.clientName]['quantity'] += 1 : stadistic.cashier[trans.clientName] = {'total':trans.total, 'quantity':1}
        trans.clientName in stadistic.cashier? stadistic.cashier[trans.clientName]['total'] += trans.total : true;


      }
      for (let waiter in stadistic.waiter){
        stadistic.waiter[waiter]['average'] = Math.floor(stadistic.waiter[waiter].total/stadistic.waiter[waiter].quantity)
      }
      res.status(200).json(stadistic);
    
    } catch (err) {
      console.error('Ocurrió un error', err);
      res.status(500).json({error: err.message});
    }
  };

  export default workerStadistics