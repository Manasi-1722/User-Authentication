import Connection from "@/database/config";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


// Database connection is established
Connection(); 

export const GET = async (NextRequest) => {
    try {
        const response = NextResponse.json({ message: 'Logout successful', success: true });

        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;

    } catch (error) {
        console.log("ERROR", error.message);
        return new Response("Something went wrong ", { status: 500 })
    }
}