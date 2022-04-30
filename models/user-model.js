import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TodoSchema } from './todo-model.js';
import { NotFoundError } from '../errors/index.js';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '이름을 입력해주세요.'],
      trim: true,
    },

    nickname: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: [true, '이메일을 입력해주세요.'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, '유효한 이메일이 아닙니다.'],
    },

    password: {
      type: String,
      required: [true, '비밀번호를 입력해주세요.'],
      minlength: 6,
      select: false,
    },

    todos: [TodoSchema],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  const user = this;

  return await bcrypt.compare(password, user.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  const user = this;

  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.removeTodo = function (ids) {
  const user = this;
  console.log(ids);
  const todoExist = user.todos.filter(todo => {
    return ids.includes(todo._id.toString());
  });

  if (todoExist.length === 0) {
    throw new NotFoundError('존재하지 않는 글 입니다.');
  }

  for (let i = 0; i < ids.length; i++) {
    user.todos.pull({ _id: ids[i] });
  }
  return user.save();
};

export default mongoose.model('User', UserSchema);
