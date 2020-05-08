import { commentMutations } from './resources/comment/comment.schema';
import { postMutations } from './resources/post/post.schema';
import {userMutations} from './resources/user/user.schema'
import { tokenMutations } from './resources/token/token.schema';
//toda mutation definition dos arquivos com .schema.ts deve ser adicionada aqui
const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${userMutations}
    }
`;

export {Mutation}