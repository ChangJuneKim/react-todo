import { Routes, Route } from 'react-router-dom';

import DashBoard from './Pages/DashBoard';
import TodoDetail from './Pages/TodoDetail';
import Todos from './Pages/Todos';
import Register from './Pages/Register';

import Header from './components/Header/Header';
import SnackBar from './UI/SnackBar';

function App() {
  return (
    <>
      <SnackBar />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path='register' element={<Register />} />
          <Route path='todos' element={<Todos />} />
          <Route path='todos/:id' element={<TodoDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
