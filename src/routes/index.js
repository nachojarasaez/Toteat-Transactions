"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MW = __importStar(require("../middleware/index"));
const getAllWaiters_1 = __importDefault(require("./get/getAllWaiters"));
const appRouter = express_1.Router();
const utilMW = new MW.utilMiddleware();
//Get Methods
appRouter.get('/waiters', getAllWaiters_1.default);
//Post Methods
//Patch Methods
exports.default = appRouter;
//# sourceMappingURL=index.js.map