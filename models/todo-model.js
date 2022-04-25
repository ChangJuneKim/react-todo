import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    user_id: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todo', TodoSchema);
