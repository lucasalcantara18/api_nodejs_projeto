import { commentQueries } from './resources/comment/comment.schema';
import { postQueries } from './resources/post/post.schema';
import {userQueries} from './resources/user/user.schema'
//toda query definition dos arquivos contendo .schema.ts deve ser adicionada aqui
const Query = `
    type Query {
        ${commentQueries}
        ${postQueries}
        ${userQueries}
    }
`;

export {Query}