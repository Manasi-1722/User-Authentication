"use client"
import { useState } from 'react';
import Input from "@/app/components/Input";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import axios from 'axios';



const defaultData = { username: "", password: "" };

const Login = () => {

    const [data, setData] = useState(defaultData);

    const router = useRouter();
    const onValueChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onLogin = async (e) => {
        e.preventDefault();

        if(!data.username || !data.password) {
            alert("Please fill all mandatory fields");
            return;
        }

        // API CALL
        try {
            const response = await axios.post('/api/users/login', data);
            setData(defaultData);

            if(response.status === 200) {
                router.push('/profile');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 nb-4">
                <h1 className="text-3xl mb-4 text-center">Login</h1>
                <form>
                    <Input 
                        label="Username"
                        id="username"
                        type="text"
                        value={data.username}
                        onChange = {(e) => onValueChange(e)}
                    />
                    <Input 
                        label="Password"
                        id="password"
                        type="password"
                        value={data.password}
                        onChange = {(e) => onValueChange(e)}
                    />
                    <button 
                        className="bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 rounded-full w-full"
                        onClick={(e) => onLogin(e)}
                    >
                        Submit
                    </button>
                </form>
                <p className="mt-4 text-center"> 
                    Don't have an account? {" "}
                    <Link href="/register" className="text-purple-400 hover:underline"> Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;