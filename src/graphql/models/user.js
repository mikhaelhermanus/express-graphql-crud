import { ObjectId } from "mongodb";

export const resolvers = {
    Query: {
        users: (obj, args, { mongo }) => {
            return mongo.users.find().limit(20).toArray();
        },
        user: async (obj, { id }, { mongo }) => {
            const user = await mongo.users.findOne({ _id: new ObjectId(id) })
            return user

        }
    },

    Mutation: {
        createUser: async (_, { user }, { mongo }) => {
            // insert into database
            const response = await mongo.users.insertOne(user)

            return {
                id: response.insertedId,
                ...user
            }
        },

        deleteUser: async (obj, { id }, { mongo }) => {
            await mongo.users.deleteOne({ _id: new ObjectId(id) })
        },

        updateUser: async (obj, { id, update }, { mongo }) => {
            const response = await mongo.users.updateOne(
                { _id: new ObjectId(id) },
                { $set: { name: update.name } }
              );        
            console.log(response, 'line 32')
            return mongo.users.findOne({ _id: new ObjectId(id) });
        }
    },

    User: {
        // manipulate the response
        // example :  id: ({obj}) => obj._id || obj.id,
        id: ({ id, _id }) => _id || id,
        name: (obj) => {
            return obj.name.trim().toUpperCase()
        }
    }
}
// MXOanw98IcxhvRpG
export const typeDef = /* GraphQL */ `
    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        createUser (user: NewUserInput!): User
        deleteUser (id: ID!): Boolean
        updateUser (id: ID!, update: UpdateUserInput ) : User
    }

    input NewUserInput{
        name: String!,
        email: String!
    }

    input UpdateUserInput{
        name: String!,
    }
    
    type User{
        id: ID!,
        name: String,
        email: String
}`;