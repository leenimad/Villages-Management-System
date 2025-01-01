const { buildSchema } = require('graphql');

  
module.exports = buildSchema(`
    type User {
        id: ID!
        username: String!
        role: String!
        token: String
    }

    input UserInput {
        username: String!
        password: String!
        role: String
    }

    type AuthData {
        userId: ID!
        token: String!
        role: String!
    }

    type Query {
        login(username: String!, password: String!): AuthData!
    }

    type Mutation {
        signup(userInput: UserInput!): User!
    }
`);
