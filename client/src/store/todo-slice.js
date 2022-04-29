import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from './todo-service';

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// 생성
export const createTodo = createAsyncThunk('todo/create', async (todoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.createTodo(todoData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// 모든 할일 목록 가져오기
export const getTodos = createAsyncThunk('todo/get-all', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.getTodos(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// 하나 가져오기
export const getTodo = createAsyncThunk('todo/get-one', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.getTodo(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// 삭제
export const deleteTodo = createAsyncThunk('todo/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.deleteTodo(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTodo = createAsyncThunk('todo/update', async (id, todoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.deleteTodo(id, todoData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },

    toggleCheckTodo: (state, action) => {
      state.todos.forEach(todo => {
        if (todo._id === action.payload) {
          todo.checked = !todo.checked;
        }
      });
    },
  },
  extraReducers: builder => {
    builder
      //생성
      .addCase(createTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // getAll
      .addCase(getTodos.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload.todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // getOne
      .addCase(getTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      // 삭제
      .addCase(deleteTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter(todo => todo._id !== action.payload.id);
        state.message = action.payload.message;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      // 수정
      .addCase(updateTodo.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter(todo => todo._id !== action.payload.id);
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset, toggleCheckTodo } = todoSlice.actions;
export default todoSlice.reducer;
