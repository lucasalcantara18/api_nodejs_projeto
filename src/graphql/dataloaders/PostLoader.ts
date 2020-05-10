import { PostModel, PostInstance } from "../../models/PosModel";
import { DataLoaderParam } from "../../interfaces/DataLoaderParamInterface";
import { RequestedFields } from "../ast/RequestedFields";


export class PostLoader{

    static async batchPosts(Post: PostModel, params: DataLoaderParam<number>[], requestedFields:RequestedFields): Promise<PostInstance[]>{
        //TODO: Se der erro nesta parte, verificar o retorno se nao estar conflitando com promisse.

        let ids: number[] = params.map(param => param.key);

        return await Post.findAll({
            where: {id: {$in: ids}},
            attributes: requestedFields.getFields(params[0].info, {keep: ['id'], exclude: ['comments']})
        });
    }

}