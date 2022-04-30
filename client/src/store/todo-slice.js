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
export const deleteTodo = createAsyncThunk('todo/delete', async (ids, thunkAPI) => {
  try {
    if (ids.constructor.name === 'String') {
      ids = [ids];
    }
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.deleteTodo([...ids], token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTodo = createAsyncThunk('todo/update', async (id, todoData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await todoService.updateTodo(id, todoData, token);
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

    checkAllTodos: (state, action) => {
      const newTodos = [...state.todos];
      if (action.payload) {
        newTodos.forEach(todo => {
          todo.checked = true;
        });
      } else {
        newTodos.forEach(todo => {
          todo.checked = !todo.checked;
        });
      }
      state.todos = newTodos;
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
        state.todos.push(action.payload.todo);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
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
        state.todos = action.payload.todo;
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
        const ids = action.payload.todoIds;
        const result = state.todos.filter(todo => !ids.includes(todo._id));
        console.log(result);
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = result;
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
        const newTodo = action.payload.todo;
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.map(todo => {
          if (todo._id !== action.payload.todo.id) {
            return todo;
          } else {
            return newTodo;
          }
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset, toggleCheckTodo, checkAllTodos } = todoSlice.actions;
export default todoSlice.reducer;
