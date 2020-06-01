// import * as jwt from 'jsonwebtoken';

// import { chai, db, app, expect, handleError } from './../../test-utils';
// import { UserInstance } from '../../../src/models/UserModel';
// import { JWT_SECRET } from '../../../src/utils/utils';
// import { PostInstance } from '../../../src/models/PosModel';

// describe('Post', () => {

//     let token: string;
//     let userId: number;
//     let postId: number;

//     beforeEach(() => {
//         return db.Comment.destroy({where: {}})
//             .then((rows: number) => db.Post.destroy({where: {}}))
//             .then((rows: number) => db.User.destroy({where: {}}))
//             .then((rows: number) => db.User.create(
//                 {
//                     name: 'Rocket',
//                     email: 'rocket@guardians.com',
//                     password: '1234'
//                 }
//             )).then((user: UserInstance) => {
//                 userId = user.get('id');
//                 const payload = {sub: userId};
//                 token = jwt.sign(payload, JWT_SECRET);

//                 return db.Post.bulkCreate([
//                     {
//                         title: 'First post',
//                         content: 'First post',
//                         author: userId,
//                         photo: "some_photo"
//                     },
//                     {
//                         title: 'Second post',
//                         content: 'Second post',
//                         author: userId,
//                         photo: 'some_photo'
//                     },
//                     {
//                         title: 'Third post',
//                         content: 'Third post',
//                         author: userId,
//                         photo: 'some_photo'
//                     }
//                 ]);
//             }).then((posts: PostInstance[]) => {
//                 postId = posts[0].get('id');
//             });
//     });
// });
//Futuramente se eu voltar aqui, acabar de implementar os testes para posts, token e comments