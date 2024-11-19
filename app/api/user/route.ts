import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    //extract the body here
    const body = await req.json();
    //store the body 
    console.log(body);
    return Response.json(({
        message: "You are logged in!"
    }))
}