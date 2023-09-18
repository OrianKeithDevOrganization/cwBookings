import './App.css'
import { Route,Routes} from "react-router-dom";
import IndexPage from './Components/Pages/IndexPage';
import Login from './Components/Pages/Login';
import Layout from './Components/layout/Layout'
import Register from './Components/Pages/Register';
import axios from 'axios';
import { UserContextProvider } from './SupportUtilities/UserContext';
import AccountPage from './Components/Pages/AccountPage';
import PlacesPage from './Components/Pages/PlacesPage';
import PlacesForm from './Components/Pages/PlacesForm';
import BookingsPage from './Components/Pages/BookingsPage';

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
          <Route path='/account/' element={<AccountPage />} />
          <Route path='/account/places' element={<PlacesPage /> } />
          <Route path='/account/bookings' element={<BookingsPage /> } />
          <Route path='/account/places/new' element={<PlacesForm /> } />

        </Route>
      </Routes>
    </UserContextProvider>
    
  );
}

export default App
