import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/PosModel";
import { CommentModel } from "../models/CommentModel";

export interface ModelsInterface {
//Interface para saber os models da aplicaçao. Deve ser adicionado aqui todos os models definidos na pasta Models, sendo o conteudo da mesma definido para cada projeto a ser códiicado.
    User:UserModel;
    Post:PostModel;
    Comment:CommentModel;

}