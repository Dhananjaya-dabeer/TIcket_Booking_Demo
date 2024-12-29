import { connectToDataBase, client} from "@/lib/db.js"
import { errorHandler, responseHandler } from "@/lib/handlers";
import bcrypt from 'bcrypt'
connectToDataBase()



export async function POST(req) {
    try {
        const requestBody = await req.text();  
        
        if (!requestBody) return errorHandler('Request body is empty', 400)

        const { username, email, password } = JSON.parse(requestBody)
        if(!username || !email || !password) return errorHandler('Missing Required Fields', 400) 

        const userExists = await client.query("SELECT email, username FROM users WHERE email = $1", [email]);
        // console.log(userExists.rows)
        if(userExists?.rows[0]?.email == email)   return errorHandler("User already exists", 409);
        const hashedPassword = bcrypt.hashSync(password, 10)
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *'
        const values = [username, email, hashedPassword]
        const result = await client.query(query, values)
        const newUser = result.rows[0]
        const info = {
            message: 'User created Successfully',
            user: newUser
        }
        return responseHandler(info, 201)
    } catch (error) {
        return errorHandler(error, 500)
    }
}