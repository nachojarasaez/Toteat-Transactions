import { prisma } from '../../../../prisma/generated/prisma-client';

const workerStadistics: any = async (req: any, res: any) => {
    try {
        var stadistic : any = {waiter : {}, cashier :{}}
        let { month, day } = req.query;
        var initialDate;
        var terminalDate;
        if (month) {
          if (day) {
              initialDate = new Date(2019, parseInt(month) - 1, parseInt(day) - 1);
              terminalDate = new Date(2019, parseInt(month) - 1, parseInt(day));
          }
          else {
              initialDate = new Date(2019, parseInt(month) - 1, 1);
              terminalDate = new Date(2019, parseInt(month), 1);
          }
      }
      else {
          initialDate = new Date(2019, 0, 1);
          terminalDate = new Date(2019 + 1, 0, 1);
      }
        const transactions: any = await prisma.transactions().$fragment(`
        fragment waiter on transaction{
            id
            clientName
            total
            dateOpen
            waiter{
                id
                name
            }
        }
        `);
      var productDate;
      for (let trans of transactions) {
        productDate = new Date(trans['dateOpen']);
        console.log(productDate)
        if (initialDate.valueOf() < productDate.valueOf() && terminalDate.valueOf() > productDate.valueOf()) {
        trans.waiter.name in stadistic.waiter? stadistic.waiter[trans.waiter.name]['quantity'] += 1 : stadistic.waiter[trans.waiter.name] = {'total':trans.total, 'quantity':1};
        trans.waiter.name in stadistic.waiter? stadistic.waiter[trans.waiter.name]['total'] += trans.total : true;

        trans.clientName in stadistic.cashier? stadistic.cashier[trans.clientName]['quantity'] += 1 : stadistic.cashier[trans.clientName] = {'total':trans.total, 'quantity':1}
        trans.clientName in stadistic.cashier? stadistic.cashier[trans.clientName]['total'] += trans.total : true;
      }
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