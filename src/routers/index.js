"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createWaiter_1 = __importDefault(require("./post/createWaiter"));
const getAllWaiters_1 = __importDefault(require("./get/getAllWaiters"));
const appRouter = express_1.Router();
//Get Methods
appRouter.get('/waiters', getAllWaiters_1.default);
//Post Methods
appRouter.post('/createWaiter', createWaiter_1.default);
//Patch Methods
exports.default = appRouter;
//# sourceMappingURL=index.js.map