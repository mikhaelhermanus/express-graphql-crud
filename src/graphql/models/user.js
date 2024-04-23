export const resolvers = {
    Query: {
        user: () => {
            return {
                id: 1,
                name: 'Mikhael'
            };
        }
    },

    Mutation: {
        createUser: (_, { user }) => {
            // insert into database
            return {
                id: 1,
                ...user
            }
        }
    },

    User: {
        name: (obj) => {
            return obj.name.trim().toUpperCase()
        }
    }
}

export const typeDef = /* GraphQL */ `
    type Query {
        user: User
    }

    type Mutation {
        createUser (user: NewUserInput!): User
    }

    input NewUserInput{
        name: String!,
        age: Int!
    }
    
    type User{
        id: Int,
        name: String,
        age: Int
}`;