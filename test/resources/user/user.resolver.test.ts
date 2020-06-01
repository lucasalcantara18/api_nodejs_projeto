import * as jwt from 'jsonwebtoken';
import { app, db, chai, handleError, expect } from "../../test-utils";
import { UserInstance } from "../../../src/models/UserModel";
import { isRegExp } from "util";
import { JWT_SECRET } from '../../../src/utils/utils';


describe('user', () => {

    let token:string;
    let userId:number;

    beforeEach(() => {
        return db.Comment.destroy({where: {}})
                         .then((rows: number) => db.Post.destroy({where: {}}))
                         .then((rows: number) => db.User.destroy({where: {}}))
                         .then((rows: number) => db.User.bulkCreate([
                             {
                                name: 'Peter Quill',
                                email: 'peter@guardians.com',
                                password: '1234'
                             },
                             {
                                name: 'Gamora',
                                email: 'gamora@guardians.com',
                                password: '5678'
                             },
                             {
                                name: 'Rocket Raccoon',
                                email: 'rocket@guardians.com',
                                password: '9876'
                             }
                            ])).then((users: UserInstance[]) => {
                                userId = users[0].get('id');
                                const payload = {sub: userId}
                                token = jwt.sign(payload, JWT_SECRET);
                            });
    });
    describe('Queries', () => {
        describe('application/json', () => {
           describe('users', () => {
                //teste 
                it('should return a list of users', () => {
                        let body = {
                            query: `
                                query{
                                    users{
                                        name
                                        email
                                    }
                                }
                            `
                        };

                        return chai.request(app)
                                .post('/graphql')
                                .set('content-type', 'application/json')
                                .send(JSON.stringify(body))
                                .then(res => {
                                    const usersList = res.body.data.users;
                                        expect(res.body.data).to.be.an('object');
                                        expect(usersList).to.be.an('array');
                                        expect(usersList[0]).to.not.have.keys(['id', 'photo', 'createdAt', 'updatedAt', 'posts']);
                                        expect(usersList[0]).to.have.keys(['name', 'email']);
                                }).catch(handleError);
                });
                //teste 
                it('shold paginate a list of users', () => {
                    let body = {
                        query: `
                            query getUsersList($first: Int, $offset: Int){
                                users(first: $first, offset: $offset){
                                    name
                                    email
                                    createdAt
                                }
                            }
                        `,
                        variables: {
                            first: 2,
                            offset: 1
                        }
                    };

                    return chai.request(app)
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body))
                            .then(res => {
                                const usersList = res.body.data.users;
                                    expect(res.body.data).to.be.an('object');
                                    expect(usersList).to.be.an('array').of.length(2);
                                    expect(usersList[0]).to.not.have.keys(['id', 'photo', 'updatedAt', 'posts']);
                                    expect(usersList[0]).to.have.keys(['name', 'email', 'createdAt']);
                            }).catch(handleError);
                });
           });
           describe('user', () => {
                //teste 
                it('shold return a single user', () => {
                    let body = {
                        query: `
                            query getSingleUser($id: ID!){
                                user(id: $id){
                                    id
                                    name
                                    email
                                    posts{
                                        title
                                    }
                                }
                            }
                        `,
                        variables: {
                            id: userId
                        }
                    };

                    return chai.request(app)
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body))
                            .then(res => {
                                const user = res.body.data.user;
                                    expect(res.body.data).to.be.an('object');
                                    expect(user).to.be.an('object');
                                    expect(user).to.have.keys(['id', 'name', 'email', 'posts']);
                                    expect(user.name).to.equal('Peter Quill');
                                    expect(user.email).to.equal('peter@guardians.com');
                            }).catch(handleError);
                });
                 //teste 
                 it('shold return only \'name\' attibute of a user', () => {
                    let body = {
                        query: `
                            query getSingleUser($id: ID!){
                                user(id: $id){
                                    name
                                }
                            }
                        `,
                        variables: {
                            id: userId
                        }
                    };

                    return chai.request(app)
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body))
                            .then(res => {
                                const user = res.body.data.user;
                                    expect(res.body.data).to.be.an('object');
                                    expect(user).to.be.an('object');
                                    expect(user).to.have.key('name');
                                    expect(user.name).to.equal('Peter Quill');
                                    expect(user.email).to.undefined;
                            }).catch(handleError);
                });
                //teste 
                it('shold return an error if user not exist', () => {
                    let body = {
                        query: `
                            query getSingleUser($id: ID!){
                                user(id: $id){
                                    name
                                    email
                                }
                            }
                        `,
                        variables: {
                            id: -1
                        }
                    };

                    return chai.request(app)
                            .post('/graphql')
                            .set('content-type', 'application/json')
                            .send(JSON.stringify(body))
                            .then(res => {
                                const user = res.body.data.user;
                                    expect(res.body.data.user).to.be.null;
                                    expect(res.body.errors).to.be.an('array');
                                    expect(res.body).to.have.keys(['data', 'errors']);
                            }).catch(handleError);
                });
           });

        });
    });

    describe('Mutations', ()=> {
        describe('application/json', ()=> {
            describe('createUser', ()=> {
                it('should create new user', () => {
                    let body = {
                        query: `
                            mutation createNewUser($input: UserCreateInput!){
                                createUser(input: $input){
                                    id
                                    name
                                    email
                                }
                            }
                        `,
                        variables: {
                            input: {
                                name: 'Nebula',
                                email: 'nebula@guardians.com',
                                password: '1367'
                            }
                        }
                    };

                    return chai.request(app).post('/graphql').set('content-type', 'application/json').send(JSON.stringify(body))
                               .then(res => {
                                    const createdUser = res.body.data.createUser;
                                    expect(createdUser).to.be.an('object');
                                    expect(createdUser.name).to.equal('Nebula');
                                    expect(createdUser.email).to.equal('nebula@guardians.com');
                                    expect(parseInt(createdUser.id)).to.be.a('number');
                               }).catch(handleError)


                });
            });    

            describe('updateUser', ()=> {
                it('should update an existing user', () => {
                    let body = {
                        query: `
                            mutation updateExistingUser($input: UserUpdateInput!){
                                updateUser(input: $input){
                                    name
                                    email
                                    photo
                                }
                            }
                        `,
                        variables: {
                            input: {
                                name: 'Star Lord',
                                email: 'peter@guardians.com',
                                photo: 'some_photo'
                            }
                        }
                    };

                    return chai.request(app).post('/graphql').set('content-type', 'application/json')
                                                             .set('authorization', `Bearer ${token}`)
                                                             .send(JSON.stringify(body))
                               .then(res => {
                                    const updatedUser = res.body.data.updateUser;
                                    expect(updatedUser).to.be.an('object');
                                    expect(updatedUser.name).to.equal('Star Lord');
                                    expect(updatedUser.email).to.equal('peter@guardians.com');
                                    expect(updatedUser.photo).to.not.be.null;
                                    expect(updatedUser.id).to.be.undefined;
                               }).catch(handleError)


                });

                // it('should block operation when token is invalid', () => {
                //     let body = {
                //         query: `
                //             mutation updateExistingUser($input: UserUpdateInput!){
                //                 updateUser(input: $input){
                //                     name
                //                     email
                //                     photo
                //                 }
                //             }
                //         `,
                //         variables: {
                //             input: {
                //                 name: 'Star Lord',
                //                 email: 'peter@guardians.com',
                //                 photo: 'some_photo'
                //             }
                //         }
                //     };

                //     return chai.request(app).post('/graphql').set('content-type', 'application/json')
                //                                              .set('authorization', `Bearer `)
                //                                              .send(JSON.stringify(body))
                //                .then(res => {
                //                     const updatedUser = res.body;
                //                     expect(updatedUser.data.updateUser).to.be.null;
                //                     expect(updatedUser).to.have.keys(['data', 'errors']);
                //                     expect(updatedUser.errors).to.be.an('array');
                //                     expect(updatedUser.errors[0].message).to.equal('JsonWebTokenError: jwt malformed');
                //                }).catch(handleError)


                // });

            });    
            // describe('updatePasswordUser', () => {
            //     it('should update the password of existing user', () => {
            //         let body = {
            //             query: `
            //                 mutation updateUserPassword($input: UserUpdatePasswordInput!){
            //                     updateUserPassword(input: $input)
            //                 }
            //             `,
            //             variables: {
            //                 input: {
            //                     password: 'peter214',
            //                 }
            //             }
            //         };

            //         return chai.request(app).post('/graphql').set('content-type', 'application/json')
            //                                                  .set('authorization', `Bearer ${token}`)
            //                                                  .send(JSON.stringify(body))
            //                    .then(res => {
            //                         expect(res.body.data.updateUserPassword).to.be.true;
            //                    }).catch(handleError)


            //     });

            // });
            describe('deleteUser', () => {
                it('should delete existing user', () => {
                    let body = {
                        query: `
                            mutation{
                                deleteUser
                            }
                        `
                    };

                    return chai.request(app).post('/graphql').set('content-type', 'application/json')
                                                             .set('authorization', `Bearer ${token}`)
                                                             .send(JSON.stringify(body))
                               .then(res => {
                                    expect(res.body.data.deleteUser).to.be.true;
                               }).catch(handleError)


                });

            });
        });
    });
});