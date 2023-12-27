import { buildSchema } from "graphql";

const userQLSchema = buildSchema(`
    scalar Date

    type User{
        id:ID!,
        name:String!,
        email:String!,
        date_of_birth:Date!
    }

    type Query{
        users:[User]
    }

    input updateUserInput{
        name:String,
        email:String,
        date_of_birth:Date
    }

    type Mutation{
        addUser(name:String!,email:String!,date_of_birth:Date!,password:String!) : User
        updateUser(id: ID!,updates: updateUserInput ) : User
        deleteUser(id: ID!): User
    }

    

`);

module.exports = userQLSchema;

// mutation {
//     addUser(
//       name: "John Doe"
//       email: "john@example.com"
//       date_of_birth: "1990-01-01"
//       password: "securepassword"
//     ) {
//       id
//       name
//       email
//       date_of_birth
//     }
//   }


// mutation {
//     updateUser(
//       id: "65886d348223282afb633683",  
//       updates: {
//         name: "New Name",
//         email: "new.email@example.com",
//         date_of_birth: "1990-01-01",
//       }
//     ) {
//       id
//       name
//       email
//       date_of_birth
//     }
//   }
  