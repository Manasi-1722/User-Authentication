import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import Connection from "@/database/config";

// Database connection is established
Connection(); 

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();

        const { name, username, password } = body;

        // If any field is not given - Error
        if(!name || !username || !password) {
            return new Response("name, username and password are required", { status: 401 });
        }

        // when username is already exist - Error
        const user = await User.findOne({ username });
        if(user) {
            return new Response("Username already exist", { status: 400 });
        }

        // Library - Bcryptjs is used to encryption
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User ({
            name, 
            username,
            password: hashedPassword
        })

        await newUser.save();

        return new Response("User saved successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong ", { status: 500 })
    }
}