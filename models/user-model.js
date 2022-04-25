import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '이름을 입력해주세요.'],
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

export default mongoose.model('User', UserSchema);
