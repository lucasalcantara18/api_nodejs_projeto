"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const user_schema_1 = require("./resources/user/user.schema");
const token_schema_1 = require("./resources/token/token.schema");
//toda mutation definition dos arquivos com .schema.ts deve ser adicionada aqui
const Mutation = `
    type Mutation {
        ${comment_schema_1.commentMutations}
        ${post_schema_1.postMutations}
        ${token_schema_1.tokenMutations}
        ${user_schema_1.userMutations}
    }
`;
exports.Mutation = Mutation;
