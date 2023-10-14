"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Profile = () => {

    const router = useRouter();

    const onLogout = async () => {
    

        // API CALL
        const response = await axios.get('/api/users/logout');

        if(response.status === 200){
            router.push('/login');
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white px-16 pt-8 pb-12 nb-4">
                <h1 className="text-3xl mb-4 text-center">Welcome to Home Page</h1>
                <p>Welcome to your personalised home page <br/>You can view and manage your account information</p>
                <button 
                    className="bg-purple-400 hover:bg-purple-700 text-white py-2 px-4 mt-4 rounded-full w-full"
                    onClick={onLogout}
                >
                    Logout
                </button>     
            </div>
        </div>
    );
}

export default Profile;