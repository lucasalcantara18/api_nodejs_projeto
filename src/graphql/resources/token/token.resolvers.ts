import { DbConnection } from "../../../interfaces/DBConnectionInterface";
import { UserInstance } from "../../../models/UserModel";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../../utils/utils";


export const tokenResolvers = {

    Mutation: {
        createToken: (parent, {email, password}, {db}:{db:DbConnection}) => {
            return db.User.findOne({
                where: {email: email},
                attributes: ['id', 'password']
            }).then((user: UserInstance) => {
                
                let errorMessage:string = 'Unauthorized, wrong email or password';
                if(!user) {throw new Error(errorMessage);}
                if(!user.isPassword(user.get('password'), password)){throw new Error(errorMessage);}

                const payload = {sub: user.get('id')};
                console.log("chave secreta abaixo");
                console.log(JWT_SECRET);
                //FIXME olhar a criação de variaveis de ambiente
                return {
                    token: jwt.sign(payload, JWT_SECRET)//aqui eu devo chamar o objeto JWT_SECRET criado no utils
                }

            });

        }

    }


};