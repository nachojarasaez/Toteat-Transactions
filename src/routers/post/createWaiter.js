"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../prisma/generated/prisma-client");
const createWaiter = async (req, res) => {
    const { waiter } = req.body;
    let newWaiter;
    try {
        newWaiter = await prisma_client_1.prisma.createWaiter(waiter);
    }
    catch (e) {
        res.status(500).send(e);
        return;
    }
    res.status(200).json(newWaiter);
};
exports.default = createWaiter;
//# sourceMappingURL=createWaiter.js.map