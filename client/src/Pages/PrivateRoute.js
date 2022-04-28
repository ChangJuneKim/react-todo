import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  const isUser = user;
  return isUser ? children : <Navigate to='/register' />;
};
export default PrivateRoute;
