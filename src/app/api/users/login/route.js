import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import Connection from "@/database/config";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


// Database connection is established
Connection(); 

export const POST = async (req) => {
    try {
        const body = await req.json();

        const { username, password } = body;

        // If any field is not given - Error
        if(!username || !password) {
            return new Response("Username and Password is required", { status: 400 });
        }

        // when username is already exist - Error
        const user = await User.findOne({ username });
        if(!user) {
            return new Response("Username does not exist", { status: 404 });
        }

        // check if given password is matched with original password saved in Database
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) {
            return new Response("Incorrect Password", { status: 401 });
        }

        const tokenData = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        const response = NextResponse.json({ message: 'Login successful'});

        response.cookies.set("token", token, { httpOnly: true, secure: true, sameSite: "strict" });
        return response;

    } catch (error) {
        console.error("Error occurred during login:", error.stack || error.message);
        return new Response("Something went wrong: " + error.message, { status: 500 });
    }
}