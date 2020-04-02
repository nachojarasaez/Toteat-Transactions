import {Storage} from '@google-cloud/storage';


export class utilMiddleware {

  downloadFile = async() => 
  {
    const bucketName = 'backupdatadev';
    const srcFilename = 'ejercicio/ventas.json';
    const destFilename = 'ventas.json';
    const storage = new Storage();
    const options = {
      destination: destFilename,
    };
    await storage
        .bucket(bucketName)
        .file(srcFilename)
        .download(options);

    console.log(
      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
    );
    
  }

  getData = async (req: any, res: any, next: any) => {
    'use strict';
    const fs = require('fs');
    let rawdata = fs.readFileSync('downloaded.json');
    let student = JSON.parse(rawdata);
    console.log(student[0]);
    res.locals.decoded = student
  };

}
