import { useContext } from "react";
import { UserContext } from "../../SupportUtilities/UserContext";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';


const AccountPage = () => {

    const {subpage} = useParams();

    const {ready, user} = useContext(UserContext);


    // logout Handler 

    const logoutHandler = async () => {
        await axios.post('/logout');
    }



    if (!ready) {
        return <div>Loading user ... </div>
    }

    // redirecting to login if not logged in
    if (ready && !user) {
        return <Navigate to={'/login'} />
    }


    function linkClasses (type=null) {
        let classes = 'py-2 px-6'

        if (type === subpage || (subpage === undefined && type === 'profile')) {
            classes += ' bg-primary text-white rounded-full';
        }

        console.log(classes)
        return classes;
    }


    return (
        <div> 
            <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
                <Link className={linkClasses('books')} to={'/account/books'}>My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My Accomodations</Link>
            </nav> 


            {subpage === 'profile' && (
                <div className="text-center max-w-xlg mx-auto">
                    Logged in as {user.name} ({user.email})
                    <button onClick={logoutHandler} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
        </div>
    )

}

export default AccountPage;