import mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema(
  {
    checked: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: () => Date.now(),
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    nickname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todo', TodoSchema);
