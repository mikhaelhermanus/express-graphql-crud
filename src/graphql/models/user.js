export const resolvers = {
    Query: {
        user: () => {
            return {
                id: 1,
                name: 'Mikhael'
            };
        }
    },

    User: {
        name: (obj) => {
            return obj.name.toUpperCase()
        }
    }
}

export const typeDef = /* GraphQL */ `
    type Query {
        user: User
    }
    
    type User{
        id: Int,
        name: String
}`;