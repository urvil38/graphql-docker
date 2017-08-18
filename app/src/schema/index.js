import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolver';

const typeDefs = `
    type Link {
        id : ID!
        url : String!
        description : String!
        postedBy : User
    }

    type Query {
        allLinks : [Link!]!
        allUsers : [User!]!
        findUser(id : String!) : User! 
    }

    type Mutation {
        createLink(url: String! , description: String!): Link
        createUser(name : String! , authProvider: AuthProviderSignupData!): User
        signinUser(details : AUTH_PROVIDER_EMAIL): SigninPayload!
    }

    type SigninPayload {
        token : String
        user : User
    }

    type User {
        id : ID!
        name : String!
        email : String!
    }

    input AuthProviderSignupData {
        details : AUTH_PROVIDER_EMAIL
    }

    input AUTH_PROVIDER_EMAIL {
        email : String!
        password : String!
    }
`;

export default makeExecutableSchema({typeDefs,resolvers});