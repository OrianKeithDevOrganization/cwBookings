import { useState, useContext } from "react";
import { UserContext } from "../../SupportUtilities/UserContext";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';


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
        let classes = 'py-2 px-6'

        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' bg-primary text-white rounded-full';
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
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('books')} to={'/account/books'}>My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My Accomodations</Link>
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
        </div>
    )

}

export default AccountPage;