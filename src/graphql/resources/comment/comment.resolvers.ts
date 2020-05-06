import { GraphQLResolveInfo } from "graphql";
import { DbConnection } from "../../../interfaces/DBConnectionInterface";
import { Transaction } from "sequelize";
import { UserInstance } from "../../../models/UserModel";
import { PostInstance } from "../../../models/PosModel";
import { CommentInstance } from "../../../models/CommentModel";
import { handleError } from "../../../utils/utils";


export const commentResolvers = {
    Comment: {
        user: (comment, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.User.findById(comment.get('user')).catch(handleError);
        }, post: (comment, args, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.Post.findById(comment.get('post')).catch(handleError);
        }
    },
    Query: {
        commentsByPost:  (post, {postId, first = 10, offset = 0}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            postId = parseInt(postId);
            return db.Comment.findAll({
                where: {post: postId},
                limit: first,
                offset: offset
            }).catch(handleError);
        }
    },
    Mutation: {
        createComment: (parent, {input}, {db}: {db: DbConnection}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.create(input, {transaction: t});
            }).catch(handleError);
        },  updateComment: (parent, {id, input}, {db}:{db:DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment:CommentInstance) => {
                        if(!comment){throw new Error(`Comment with id ${id} not found`);}
                        return comment.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }, deleteComment: (parent, {id}, {db}:{db:DbConnection}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment
                    .findById(id)
                    .then((comment:CommentInstance) => {
                        if(!comment){throw new Error(`Comment with id ${id} not found`);}
                        return comment.destroy({transaction: t })
                                   .then(() => true).catch( () => false);
                    });
            }).catch(handleError);
        } 
    }



};