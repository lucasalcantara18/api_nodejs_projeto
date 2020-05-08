"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const utils_1 = require("../../utils/utils");
exports.verifyTokenResolver = (resolver) => {
    return (parent, args, context, info) => {
        const token = context.authorization
            ? context.authorization.split(' ')[1]
            : undefined;
        console.log("verificando se ta tudo certo");
        console.log(token);
        console.log(utils_1.JWT_SECRET);
        jwt.verify(token, utils_1.JWT_SECRET, (err, decoded) => {
            if (!err) {
                console.log(resolver(parent, args, context, info));
                return resolver(parent, args, context, info);
            }
            throw new Error(`${err.name}: ${err.message}`);
        });
    };
};
