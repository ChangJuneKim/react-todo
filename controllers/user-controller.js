import validator from 'validator';
import { StatusCodes } from 'http-status-codes';

import User from '../models/user-model.js';

import asyncHandler from '../middleware/async-handler-middleware.js';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

export const register = asyncHandler(async (req, res) => {
  const { email, username, password, confirmPassword } = req.body;
  if (!email || !username || !password || !confirmPassword) {
    throw new BadRequestError('값을 모두 입력해주세요.');
  }

  if (!validator.isEmail(email)) {
    throw new BadRequestError('유효한 이메일이 아닙니다.');
  }

  const userAlreadyExist = await User.findOne({ email });
  // const userAlreadyExist = await User.where('email').equals(email); // 배열로 반환

  console.log(userAlreadyExist);

  if (userAlreadyExist) {
    throw new BadRequestError('이미 가입된 이메일 주소입니다.');
  }

  if (password.length < 6) {
    throw new BadRequestError('비밀번호는 최소 6자 이상이어야 합니다.');
  }

  if (password !== confirmPassword) {
    throw new BadRequestError('비밀번호가 다릅니다');
  }

  const user = await User.create({
    username,
    nickname: username,
    email,
    password,
  });

  const token = user.getSignedJwtToken();

  if (user) {
    res.status(StatusCodes.CREATED).json({
      user: {
        username: user.username,
        nickname: user.username,
        email: user.email,
        id: user._id,
        token,
      },
      message: `환영합니다! ${user.username} 님`,
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('이메일과 비밀번호를 입력해주세요.');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new UnAuthenticatedError('이메일 또는 비밀번호를 다시 확인하세요.');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnAuthenticatedError('이메일 또는 비밀번호를 다시 확인하세요.');
  }

  const token = user.getSignedJwtToken();

  res.status(StatusCodes.OK).json({
    user: {
      username: user.username,
      nickname: user.username,
      email: user.email,
      id: user._id,
      token,
    },
    message: `환영합니다! ${user.username} 님`,
  });
});
