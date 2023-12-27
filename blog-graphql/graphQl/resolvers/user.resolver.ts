import { ObjectId } from "mongoose";
import { deleteUser, getUserById, updateUser } from "../../models/user.model";

const { getAllUser, createUser } = require("../../models/user.model");

const userResolver = {
  Query: {
    users: async () => {
      try {
        return getAllUser();
      } catch (error) {
        throw new Error("Error Occurred in getting user details");
      }
    },
  },
  Mutation: {
    addUser: async (_:any, args:any) => {
      try {
        const newUser = await createUser(args);
        return newUser;
      } catch (error) {
        console.log(error);
        throw new Error("Error Occurred in adding user");
      }
    },

    updateUser:async(_:any,args:any) => {
        try{
            console.log(args);
            return updateUser(args.id,args.updates);
        }catch(error){
            console.log(error);
            throw new Error("Error Occured in updating user");
        }
    },

    deleteUser:async(_:any,{id}:{id:ObjectId}) => {
        try{
            return await deleteUser(id);
        }catch(error){
            throw new Error('Error Occured in deleting user');
        }
    },
  },
};

module.exports = userResolver;


// mutation {
//     deleteUser(id: "65886d348223282afb633683") {
//       id
//       name
//       email
//       date_of_birth
//     }
//   }