import { useState } from "react";

export default function Form({ method, route }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ username, password })
    }
    const name = method === "login" ? 'Login' : 'Register';
    return (
        <div className="shadow-md rounded-md w-full p-4 sm:w-96 lg:w-[450px]">
            <h1 className="font-medium text-3xl text-center">{name}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mt-8">
                <input
                    className="focus:outline-none border p-2 rounded-md"
                    type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="focus:outline-none border p-2 rounded-md"
                    type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} placeholder="Passoword" />
                <button type="submit" className="bg-sky-500 text-white font-medium text-lg py-2 rounded-md ">{name}</button>
            </form>
        </div>
    )
}
