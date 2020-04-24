import * as Sequelize from "sequelize";
import { ModelsInterface } from "./modelsInterface";

export interface DbConnection extends ModelsInterface{

    sequelize: Sequelize.Sequelize;

}