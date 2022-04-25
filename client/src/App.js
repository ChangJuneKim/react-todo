import { Routes, Route } from 'react-router-dom';
import DashBoard from './Pages/DashBoard';
import TodoDetail from './Pages/TodoDetail';
import Todos from './Pages/Todos';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path='todos' element={<Todos />} />
          <Route path='todos/:id' element={<TodoDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
