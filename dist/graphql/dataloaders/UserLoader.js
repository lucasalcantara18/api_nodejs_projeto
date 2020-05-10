"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserLoader {
    static async batchUsers(User, params, requestedFields) {
        //TODO: Se der erro nesta parte, verificar o retorno se nao estar conflitando com promisse.
        let ids = params.map(param => param.key);
        const users = await User.findAll({
            where: { id: { $in: ids } },
            attributes: requestedFields.getFields(params[0].info, { keep: ['id'], exclude: ['posts'] })
        });
        // cria um objeto js onde cada chave é um id de usuário
        // e o valor, o usuário em si
        const usersMap = users.reduce((prev, user) => ({
            ...prev,
            [user.id]: user,
        }), {});
        // garante que os usuários serão retornados na mesma ordem
        // do array de ids
        return ids.map(id => usersMap[id]);
    }
}
exports.UserLoader = UserLoader;
