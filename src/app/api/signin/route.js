import { errorHandler } from "@/lib/handlers"


export async function POST(req){
    const requestBody = await req.text()
    if(!requestBody) return errorHandler('Request body is empty', 400)
    const {email, password} = JSON.parse(requestBody)

    if(!email || !password) return  errorHandler('Missing Required Fields', 400)
}