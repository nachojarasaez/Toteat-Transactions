"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../prisma/generated/prisma-client");
const getAllWaiters = async (req, res) => {
    try {
        const userInfo = await prisma_client_1.prisma.waiters();
        res.status(200).json(userInfo);
    }
    catch (err) {
        console.error('Ocurrió un error', err);
        res.status(500).json({ error: err.message });
    }
};
exports.default = getAllWaiters;
//# sourceMappingURL=getAllWaiters.js.map