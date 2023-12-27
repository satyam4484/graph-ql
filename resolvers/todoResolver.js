const {Todo} = require("../models/Todo");
const todoResolver = {
    Query: {
        todos: async () => {
            try {
                return await Todo.find();
            } catch (error) {
                console.log(error)
                throw new Error('Error fetching todos. Please try again later.');
            }
        },
        // ... other queries
    },
    Mutation: {
        addTodo: async ({ title }) => {
            try {
                const newTodo = new Todo({ title });
                await newTodo.save();
                return newTodo;
            } catch (error) {
                throw new Error('Error adding todo', error);
            }
        },
        updateTodo: async ({ id, completed }) => {
            try {
                const todo = await Todo.findById(id);

                if (!todo) {
                    // Return null if the todo is not found
                    return null;
                }

                todo.completed = completed;
                await todo.save();

                return todo;
            } catch (error) {
                throw new Error('Error updating todo', error);
            }
        },
        // ... other mutations
    },
};

module.exports = todoResolver;
