import mongoose, { Document, Schema } from 'mongoose';
import { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLList } from 'graphql';

interface TodoModel extends Document {
  title: string;
  completed: boolean;
}

const todoSchema: Schema<TodoModel> = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model<TodoModel>('Todo', todoSchema);

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: GraphQLList(TodoType),
      resolve: async () => {
        try {
          return await Todo.find();
        } catch (error) {
          throw new Error('Error fetching todos. Please try again later.');
        }
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          const newTodo = new Todo({ title: args.title });
          await newTodo.save();
          return newTodo;
        } catch (error) {
          throw new Error('Error adding todo');
        }
      },
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        completed: { type: GraphQLBoolean },
      },
      resolve: async (_, args) => {
        try {
          const todo = await Todo.findById(args.id);
          if (!todo) {
            throw new Error('Todo not found');
          }

          todo.completed = args.completed;
          await todo.save();

          return todo;
        } catch (error) {
          throw new Error('Error updating todo');
        }
      },
    },
  },
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export { Todo, schema };
