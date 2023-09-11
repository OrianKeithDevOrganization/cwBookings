import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleLoginSubmit(event) {
        event.preventDefault();
        try {
            axios.post('/login',{email,password})
            // alert('Login successful')
            setRedirect(true);  // redirect if login is successfull.

        } catch (e) {
            console.log(e);
            alert('Login failed')
        }
    }

    // redirect to index if logged in.
    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl text-center mb-4">Login </h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input 
                        type="email" 
                        placeholder={'your@email.com'}
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)}
                    />

                    <button className="primary">Login</button>

                    <div className="text-center py-2 text-gray-500">
                        Do not have an account yet? <Link  className="underline text-black" to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
         
        </div>
    )
}

export default Login;