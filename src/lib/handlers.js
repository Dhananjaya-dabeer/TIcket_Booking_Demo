import { NextResponse } from "next/server";

export const errorHandler = async(message, status) => {
   const error = new Error()
   error.message = message
   error.statusCode = status
   console.log(error)
   return  new NextResponse(
    JSON.stringify({ error }),
    { status: status } 
);
}

export const responseHandler = async(data, status) => {

    return new NextResponse(
        JSON.stringify({ data },  { status })
       
    );
}