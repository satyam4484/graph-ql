const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const mongoose = require("mongoose");
const userQLSchema = require("./graphQl/schemas/user.schema");
const userReducer = require("./graphQl/resolvers/user.resolver");

const app= express();

const server = new ApolloServer({
    typeDefs:userQLSchema,
    resolvers:userReducer
})

async function startApolloServer() {
    await server.start();
    
    server.applyMiddleware({app,path:'/api'});

    const url = 'mongodb+srv://satyamdeveloper16:qEJqmvkr0kaLyC9c@cluster0.u3wedyn.mongodb.net/?retryWrites=true&w=majority';

    mongoose.connect(url).then(() => {
        console.log("Database connected");
        app.listen(8000, () => {
          console.log(`Server is running on http://localhost:8000/api`);
        });
      });
}

startApolloServer();
