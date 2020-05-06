const userTypes = `
    #User definition type
    type User{
        id:ID!
        name: String!
        email:String!
        photo:String
        createdAt:String!
        updatedAt:String!
        posts(first:Int, offset: Int): [Post!]!
    }

    input UserCreateInput {
        name:String!,
        email:String!,
        password:String!
    }

    input UserUpdateInput {
        name:String!,
        email:String!,
        photo:String!
    }

    input UserUpdatePassword {
        password:String!
    }
`;

const userQueries = `
    users(first: Int, offset:Int): [User!]!
    user(id: ID!): User
`;

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!): User
    updateUserPassword(id: ID!, input:UserUpdatePassword!):Boolean
    deleteUser(id:ID!):Boolean
`;

export {userTypes, userMutations, userQueries}