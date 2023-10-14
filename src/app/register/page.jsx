"use client"
import { useState } from 'react';
import Input from "@/app/components/Input";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const defaultData = { name: "", username: "", password: "" };
const Register = () => {

    const [data, setData] = useState(defaultData);

    const router = useRouter();
    const onValueChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const onRegister = async (e) => {
        e.preventDefault();

        if(!data.name || !data.username || !data.password) {
            alert("Please fill all mandatory fields");
            return;
        }

        // API CALL
        try {
            const response = await axios.post("/api/users/register", data);
            setData(defaultData);

            if(response.status === 200)
            {
                router.push("/login");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 nb-4">
                <h1 className="text-3xl mb-4 text-center">Register</h1>
                <form>
                    <Input 
                        label="Name"
                        id="name"
                        type="text"
                        value={data.name}
                        onChange = {(e) => onValueChange(e)}
                    />
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
                        onClick={(e) => onRegister(e)}
                    >
                        Submit
                    </button>
                     <p className="mt-4 text-center"> 
                        Already have an account?  
                        <Link href="/login" className="text-purple-400 hover:underline"> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;