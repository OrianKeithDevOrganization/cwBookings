import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext({});


export const UserContextProvider = (props) => {

    const [user,setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
            });
        }
    },[])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    );


}

