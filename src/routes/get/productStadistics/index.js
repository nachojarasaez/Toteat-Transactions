"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../../prisma/generated/prisma-client");
const productStadistics = async (req, res) => {
    try {
        var stadistic = { product: {}, category: {} };
        let { month, day } = req.query;
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
        const transactions = await prisma_client_1.prisma.transactions().$fragment(`
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
        for (let trans of transactions) {
            productDate = new Date(trans['dateOpen']);
            if (initialDate.valueOf() < productDate.valueOf() && terminalDate.valueOf() > productDate.valueOf()) {
                for (let product of trans.products) {
                    product.name in stadistic.product ? stadistic.product[product.name]['quantity'] += 1 :
                        stadistic.product[product.name] = { 'price': product.price, 'quantity': 1, 'category': product.category };
                }
            }
        }
        for (let prod in stadistic.product) {
            stadistic.product[prod]['total'] = stadistic.product[prod].price * stadistic.product[prod].quantity;
            stadistic.product[prod].category in stadistic.category ? stadistic.category[stadistic.product[prod].category] += stadistic.product[prod]['total'] : stadistic.category[stadistic.product[prod].category] = stadistic.product[prod]['total'];
        }
        res.status(200).json(stadistic);
    }
    catch (err) {
        console.error('Ocurrió un error', err);
        res.status(500).json({ error: err.message });
    }
};
exports.default = productStadistics;
//# sourceMappingURL=index.js.map