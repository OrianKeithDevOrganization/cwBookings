import { useState, useContext } from "react";
import { UserContext } from "../../SupportUtilities/UserContext";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';
import PlacesPage from "./PlacesPage";


const AccountPage = () => {

    const {subpage} = useParams();
    const {ready, user, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);


    // logout Handler 
    const logoutHandler = async () => {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
        
    }


    if (!ready) {
        return <div>Loading user ... </div>
    }

    // redirecting to login if not logged in and no redirections to other pages
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    function linkClasses (type=null) {
        let classes = ' inline-flex rounded-full gap-1 py-2 px-6 flex gap-1'

        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200';
        }

        return classes;
    }


    // redirecting to home page when logout is clicked

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div> 
            <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    My profile
                </Link>
                <Link className={linkClasses('books')} to={'/account/books'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    My Bookings
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                    </svg>
                    My Accomodations
                </Link>
            </nav> 

            {
                subpage === undefined && (
                    <div className="text-center max-w-lg mx-auto">
                        <div className="text-right max-w-sm mt-3">
                            <p>Name : <span className="text-gray-500">{user.name}</span> </p>
                            <p>Email : <span   className="ml-3 text-gray-500 ">{user.email}</span></p> 
                        </div>
                        <button onClick={logoutHandler} className="primary max-w-sm mt-2">Logout</button>
                    </div>
                )
            } 


            {
                subpage === 'places' && (
                    <PlacesPage />
                )
            }
        </div>
    )

}

export default AccountPage;