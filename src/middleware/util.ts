

export class utilMiddleware {
  /**
   * Función para enmascarar la contraseña. Lo que hace es recibir un string con
   * la contraseña que se quiere enmascarar y después retornarla ya encriptada.
   * 
   * @param pass: string con la contraseña a encriptar
   */
  downloadData = async () => {
    'use strict';
    const fs = require('fs');
    let rawdata = fs.readFileSync('downloaded.json');
    let student = JSON.parse(rawdata);
    console.log(student[0]);
  };

}
