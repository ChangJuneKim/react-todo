import express from 'express';
import auth from '../middleware/auth-middleware.js';
import { getTodos, createTodo, deleteTodo, updateTodo, getTodo } from '../controllers/todo-controller.js';

const router = express.Router();

router
  .route('/')
  //
  .get(auth, getTodos)
  .post(auth, createTodo)
  .put(auth, deleteTodo);

router
  .route('/:id')
  //
  .get(auth, getTodo)
  .put(auth, updateTodo);
export default router;
