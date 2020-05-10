"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostLoader {
    static async batchPosts(Post, params, requestedFields) {
        //TODO: Se der erro nesta parte, verificar o retorno se nao estar conflitando com promisse.
        let ids = params.map(param => param.key);
        return await Post.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['comments'] })
        });
    }
}
exports.PostLoader = PostLoader;
