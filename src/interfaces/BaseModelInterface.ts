import { ModelsInterface } from "./modelsInterface";

export interface BaseModelInterface {
//Interface de base para cada models da aplicação


    prototype?;
    associate?(models: ModelsInterface): void;

}