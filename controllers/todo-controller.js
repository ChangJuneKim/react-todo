import { StatusCodes } from 'http-status-codes';
import Todo from '../models/todo-model.js';
import User from '../models/user-model.js';

import asyncHandler from '../middleware/async-handler-middleware.js';

export const getTodos = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const todos = await User.where('_id').equals(id).select('todos');

  res.status(StatusCodes.OK).json({ todos: todos[0].todos });
});

export const getTodo = asyncHandler(async (req, res) => {
  const todoId = req.params.id;
  const userId = req.user._id;
  const todos = await User.where('_id').equals(userId).select('todos');

  const todo = todos[0].todos.filter(todo => {
    return todo._id.toString() === todoId;
  });

  res.status(StatusCodes.OK).json({ todo });
});

export const createTodo = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { title, description, date } = req.body;

  const newTodo = new Todo({
    title,
    description,
    date,
    author: req.user._id,
    nickname: req.user.nickname,
  });

  await User.findByIdAndUpdate({ _id: id }, { $push: { todos: newTodo } });

  // user.todos.push(newTodo);
  // await user.save();

  res.status(StatusCodes.CREATED).json({ message: 'Created a Todo' });
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const todoId = req.params.id;

  const user = await User.findById(userId);

  user.removeTodo(todoId);

  res.status(StatusCodes.OK).json({ message: `Deleted a Todo id : ${todoId}` });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const todoId = req.params.id;
  const { title, description, date } = req.body;

  await User.updateOne(
    { _id: userId, 'todos._id': todoId },
    { $set: { 'todos.$.title': title, 'todos.$.description': description, 'todos.$.date': date } }
  );

  res.status(StatusCodes.CREATED).json({ message: `Updated a Todo id : ${todoId}` });
});
