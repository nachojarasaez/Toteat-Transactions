"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("../../../../prisma/generated/prisma-client");
const generalStadistics = async (req, res) => {
    try {
        var stadistic = { zone: {}, total: {} };
        const transactions = await prisma_client_1.prisma.transactions();
        let { month, modality } = req.query;
        var initialDate;
        var terminalDate;
        let counter;
        if (modality) {
            if (month == '2') {
                counter = 28;
            }
            else {
                counter = 31;
            }
        }
        else {
            counter = 3;
        }
        console.log("Ya tengo los datos");
        for (var i = 1; i < counter + 1; i++) {
            if (modality) {
                if (i == counter) {
                    initialDate = new Date(2019, parseInt(month) - 1, i);
                    terminalDate = new Date(2019, parseInt(month), 1);
                }
                else {
                    initialDate = new Date(2019, parseInt(month) - 1, i);
                    terminalDate = new Date(2019, parseInt(month) - 1, i + 1);
                }
            }
            else {
                initialDate = new Date(2019, i - 1, 1);
                terminalDate = new Date(2019, i, 1);
            }
            var transDate;
            for (let trans of transactions) {
                trans.zone in stadistic.zone ? true : stadistic.zone[trans.zone] = {};
                transDate = new Date(trans['dateOpen']);
                if (initialDate.valueOf() < transDate.valueOf() && terminalDate.valueOf() > transDate.valueOf()) {
                    if (!(i in stadistic.zone[trans.zone])) {
                        stadistic.zone[trans.zone][i] = { 'atencion': 1, 'total': trans.total };
                    }
                    else {
                        stadistic.zone[trans.zone][i]['atencion'] += 1;
                        stadistic.zone[trans.zone][i]['total'] += trans.total;
                    }
                    if (!(i in stadistic.total)) {
                        stadistic.total[i] = { 'atencion': 1, 'total': trans.total };
                    }
                    else {
                        stadistic.total[i]['atencion'] += 1;
                        stadistic.total[i]['total'] += trans.total;
                    }
                }
            }
        }
        res.status(200).json(stadistic);
    }
    catch (err) {
        console.error('Ocurrió un error', err);
        res.status(500).json({ error: err.message });
    }
};
exports.default = generalStadistics;
//# sourceMappingURL=index.js.map