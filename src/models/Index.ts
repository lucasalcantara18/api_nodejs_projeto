//Arquivo que prepara uma instancia do sequelize e ler os models da aplicação para sincronizar com mysql
import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DBConnectionInterface';


const baseName: string = path.basename(module.filename);
const env: string = process.env.NODE_ENV || 'development';
console.log(env);

let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
console.log(config);

let db = null;
if(!db){
    db = {};

    const operatorsAliasses = {
        $in: Sequelize.Op.in // permite realizar um select passando uma listas de ids. Ex: [2,4,6] pesquisa os ids fornecidos.
    };

    config = Object.assign({operatorsAliasses}, config);

    const sequelize: Sequelize.Sequelize = new Sequelize(config.database, config.username, config.password, config);
    fs.readdirSync(__dirname)
      .filter((file: string) => {
          const filesSlice: string = file.slice(-3);
          return (file.indexOf('.') !== 0) && (file !== baseName) && ((filesSlice === '.js') || (filesSlice === '.ts'));
      })
      .forEach((file:string) => {
          const model = sequelize.import(path.join(__dirname, file));
          db[model['name']] = model;
      });


    Object.keys(db).forEach((modelName:string) => {
        if(db[modelName].associate){
            db[modelName].associate(db);
        }
    });

    db['sequelize'] = sequelize;
}
 //console.log(db);


export default <DbConnection>db;
