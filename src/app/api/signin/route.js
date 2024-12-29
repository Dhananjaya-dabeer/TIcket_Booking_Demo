import { errorHandler, responseHandler } from "@/lib/handlers";
import { queryDatabase } from "@/lib/db";
import bcrypt from 'bcryptjs';
import { generateToken } from "@/lib/jwt";




export async function POST(req) {
    const requestBody = await req.text();
    if (!requestBody) return errorHandler('Request body is empty', 400);

    const { email, password } = JSON.parse(requestBody);

    if (!email || !password) return errorHandler('Missing Required Fields', 400);




    try {
        
        console.log(email, password)
        const result = await queryDatabase('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);

        console.log(result)
        if (result.rows.length === 0) {
            return errorHandler('Invalid email or password', 401);
        }

       
        const user = result.rows[0];

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return errorHandler('Invalid email or password', 401);
        }


        const token = generateToken(user);

     
        const cookieOptions = {
            httpOnly: true,   
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
            maxAge: 60 * 60 * 24,  
        };

     
        const cookieString = `token=${token}; path=/; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
        const headers = new Headers();
        headers.append('Set-Cookie', cookieString);
        const {password:userPassword, ...rest} = user
        const data = { message: 'Login successful', rest }
        
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: headers,  
        });
    } catch (error) {
        return errorHandler(error.message, 500);
    }
}
