"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const utils_1 = require("../../../utils/utils");
exports.tokenResolvers = {
    Mutation: {
        createToken: (parent, { email, password }, { db }) => {
            return db.User.findOne({
                where: { email: email },
                attributes: ['id', 'password']
            }).then((user) => {
                let errorMessage = 'Unauthorized, wrong email or password';
                if (!user) {
                    throw new Error(errorMessage);
                }
                if (!user.isPassword(user.get('password'), password)) {
                    throw new Error(errorMessage);
                }
                const payload = { sub: user.get('id') };
                console.log("chave secreta abaixo");
                console.log(utils_1.JWT_SECRET);
                //FIXME olhar a criação de variaveis de ambiente
                return {
                    token: jwt.sign(payload, utils_1.JWT_SECRET) //aqui eu devo chamar o objeto JWT_SECRET criado no utils
                };
            });
        }
    }
};
