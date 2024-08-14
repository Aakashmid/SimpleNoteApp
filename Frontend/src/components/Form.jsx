import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import CircularProgress from '@mui/material/CircularProgress';

export default function Form({ method, route }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setIsloading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log({ username, password })
        try {
            setIsloading(true)
            const res = await api.post(route, { username, password })
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            navigate('/')
        } catch (error) {
            alert(error)
        } finally {
            setIsloading(false)
        }

    }
    const name = method === "login" ? 'Login' : 'Register';
    return (
        <div className="shadow-md rounded-md w-full p-4 sm:w-96 lg:w-[450px]">
            <h1 className="font-medium text-3xl text-center">{name}</h1>
            {loading &&
                <>
                    <p className="text-center text-sm mt-4"><CircularProgress thickness={3} /></p>
                </>
            }
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mt-8">
                <input
                    className="focus:outline-none border p-2 rounded-md"
                    type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required />
                <input
                    className="focus:outline-none border p-2 rounded-md"
                    type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} placeholder="Passoword" required />
                <p className="text-sm  text-center">
                    {method === 'login' ? (<>Don't have an account ? <Link className="text-blue-600 hover:underline font-medium" to={'/register'} >Register</Link></>)
                        :
                        (<>Already have an account ? <Link className="text-blue-600 hover:underline font-medium" to={'/login'}>Login</Link></>)}
                </p>
                <button type="submit" className="bg-sky-500 text-white font-medium text-lg py-2 rounded-md ">{name}</button>
            </form>
        </div>
    )
}
