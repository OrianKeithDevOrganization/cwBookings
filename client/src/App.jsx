import './App.css'
import { Route,Routes} from "react-router-dom";
import IndexPage from './Components/Pages/IndexPage';
import Login from './Components/Pages/Login';
import Layout from './Components/layout/Layout'
import Register from './Components/Pages/Register';
import axios from 'axios';
import { UserContextProvider } from './SupportUtilities/UserContext';
import AccountPage from './Components/Pages/AccountPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (

    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App
