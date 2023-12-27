// data/todo.js
const mongoose = require('mongoose');
const {buildSchema} = require("graphql");


const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
const schema = buildSchema(`
  type Todo{
    id:ID!,
    title:String!,
    completed:Boolean!
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(title: String!): Todo
    updateTodo(id: ID!, completed: Boolean!): Todo
  }
  
`);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo,schema};
