"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class utilMiddleware {
    constructor() {
        this.getData = async (req, res, next) => {
            'use strict';
            const fs = require('fs');
            let rawdata = fs.readFileSync('./ventas.json');
            let student = JSON.parse(rawdata);
            console.log(student[0]);
            res.locals.decoded = student;
        };
    }
}
exports.utilMiddleware = utilMiddleware;
//# sourceMappingURL=util.js.map