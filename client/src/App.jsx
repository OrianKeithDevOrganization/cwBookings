import './App.css'
import { Route,Routes} from "react-router-dom";
import IndexPage from './Components/Pages/IndexPage';
import Login from './Components/Pages/Login';
import Layout from './Components/layout/Layout'
import Register from './Components/Pages/Register';

function App() {

  return (
    <> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
