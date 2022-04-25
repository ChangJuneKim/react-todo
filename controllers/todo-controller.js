import { StatusCodes } from 'http-status-codes';
import Todo from '../models/todo-model.js';

import asyncHandler from '../middleware/async-handler-middleware.js';

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user_id: req.user._id });

  res.status(StatusCodes.OK).json({ todos });
});

export const getTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ todo });
});

export const createTodo = asyncHandler(async (req, res) => {
  const { title, content, date } = req.body;

  await Todo.create({
    title,
    content,
    date,
    user_id: req.user.id,
    username: req.user.username,
  });

  res.status(StatusCodes.CREATED).json({ msg: 'Created a Todo' });
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: `Deleted a Todo id : ${id}` });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, content, date } = req.body;

  await Todo.findByIdAndUpdate(id, {
    title,
    content,
    date,
  });

  res.status(StatusCodes.CREATED).json({ msg: `Updated a Todo id : ${id}` });
});
