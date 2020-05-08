"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const user_schema_1 = require("./resources/user/user.schema");
//toda query definition dos arquivos contendo .schema.ts deve ser adicionada aqui
const Query = `
    type Query {
        ${comment_schema_1.commentQueries}
        ${post_schema_1.postQueries}
        ${user_schema_1.userQueries}
    }
`;
exports.Query = Query;
