export class utilMiddleware {


  getData = async (req: any, res: any, next: any) => {
    'use strict';
    const fs = require('fs');
    let rawdata = fs.readFileSync('./ventas.json');
    let student = JSON.parse(rawdata);
    console.log(student[0]);
    res.locals.decoded = student
  };

}
