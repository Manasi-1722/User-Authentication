import User from "@/models/user";
import bcryptjs from 'bcryptjs';
import Connection from "@/database/config";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


// Database connection is established
Connection(); 

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();

        const { username, password } = body;

        // If any field is not given - Error
        if(!username || !password) {
            return new Response("Username and Password is required", { status: 401 });
        }

        // when username is already exist - Error
        const user = await User.findOne({ username });
        if(!user) {
            return new Response("Username does not exist", { status: 400 });
        }

        // check if given password is matched with original password saved in Database
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword) {
            return new Response("Incorrect Password", { status: 400 });
        }

        const tokenData = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY, { expiresIn: '1d' });

        const response = NextResponse.json({ message: 'Login successful'});

        response.cookies.set("token", token, { httpOnly: true });
        return response;

    } catch (error) {
        console.log("ERROR", error.message);
        return new Response("Something went wrong ", { status: 500 })
    }
}