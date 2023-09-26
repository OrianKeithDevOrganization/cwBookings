import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext({});


export function UserContextProvider(props){

    const [user,setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            });
        }
    },[])

    return (
        <UserContext.Provider value={{user,setUser,ready}}>
            {props.children}
        </UserContext.Provider>
    );


}

