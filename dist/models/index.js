"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Arquivo que prepara uma instancia do sequelize e ler os models da aplicação para sincronizar com mysql
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const baseName = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
console.log(env);
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
console.log(config);
let db = null;
if (!db) {
    db = {};
    const operatorsAliasses = {
        $in: Sequelize.Op.in // permite realizar um select passando uma listas de ids. Ex: [2,4,6] pesquisa os ids fornecidos.
    };
    config = Object.assign({ operatorsAliasses }, config);
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    fs.readdirSync(__dirname)
        .filter((file) => {
        const filesSlice = file.slice(-3);
        return (file.indexOf('.') !== 0) && (file !== baseName) && ((filesSlice === '.js') || (filesSlice === '.ts'));
    })
        .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model['name']] = model;
    });
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db['sequelize'] = sequelize;
}
//console.log(db);
exports.default = db;
