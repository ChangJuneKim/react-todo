import axios from 'axios';

const API_URL = '/api/v1/todo/';

// 생성
const createTodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, todoData, config);
  return response.data;
};

// 목록 전부 가져오기
const getTodos = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// 하나만 가져오기
const getTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${todoId}`, config);
  return response.data;
};

// 삭제
const deleteTodo = async (todoIds, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const data = { todoIds };

  const response = await axios.put(API_URL, data, config);
  return response.data;
};

// 수정
const updateTodo = async (todoData, token) => {
  const { todoId, data } = todoData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${API_URL}${todoId}`, data, config);
  return response.data;
};

const todoService = {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
};

export default todoService;
