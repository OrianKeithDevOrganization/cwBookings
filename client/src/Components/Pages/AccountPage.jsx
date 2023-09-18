import { useState, useContext } from "react";
import { UserContext } from "../../SupportUtilities/UserContext";
import { Navigate } from "react-router";
import axios from 'axios';
import AccountPageNavigation from "./AccountPageNavigation";


const AccountPage = () => {

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

    // redirecting to home page when logout is clicked
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div> 
            <AccountPageNavigation />

           
            <div className="text-center max-w-lg mx-auto">
                <div className="text-right max-w-sm mt-3">
                    <p>Name : <span className="text-gray-500">{user.name}</span> </p>
                    <p>Email : <span   className="ml-3 text-gray-500 ">{user.email}</span></p> 
                </div>
                <button onClick={logoutHandler} className="primary max-w-sm mt-2">Logout</button>
            </div>
        
        </div>
    )

}

export default AccountPage;