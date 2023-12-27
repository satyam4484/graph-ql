const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const todoResolver = require('./resolvers/todoResolver');
const { schema } = require('./models/Todo');

const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: todoResolver,
});

// Start the Apollo Server
async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 8000;

  const URL =
    'mongodb+srv://satyamdeveloper16:qEJqmvkr0kaLyC9c@cluster0.u3wedyn.mongodb.net/?retryWrites=true&w=majority';

  mongoose.connect(URL).then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
  });


}

// Start the Apollo Server and connect to MongoDB
startApolloServer();
