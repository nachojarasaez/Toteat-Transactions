"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../../prisma/generated/prisma-client");
const productStadistics = async (req, res) => {
    try {
        var stadistic = { product: {}, category: {} };
        const products = await prisma_client_1.prisma.products();
        for (let product of products) {
            product.name in stadistic.product ? stadistic.product[product.name]['quantity'] += 1 :
                stadistic.product[product.name] = { 'price': product.price, 'quantity': 1, 'category': product.category };
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