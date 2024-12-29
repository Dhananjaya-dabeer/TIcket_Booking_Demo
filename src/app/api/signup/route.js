import { queryDatabase} from "@/lib/db.js"
import { errorHandler, responseHandler } from "@/lib/handlers";



export async function GET() {
    // queryDatabase("DROP TABLE IF EXISTS users")
    const result = await queryDatabase("SELECT * FROM users WHERE email = $1",["abcd@gmail.com"])
    return responseHandler(result.rows, 200)
}

export async function POST(req) {
    try {
        const requestBody = await req.text();  
        
        if (!requestBody) return errorHandler('Request body is empty', 400)

        const { username, email, password } = JSON.parse(requestBody)
        if(!username || !email || !password) return errorHandler('Missing Required Fields', 400) 

        const userExists = await queryDatabase("SELECT email, username FROM users WHERE email = $1", [email.toLowerCase()]);
        // console.log(userExists.rows)
        if(userExists?.rows[0]?.email == email.toLowerCase())   return errorHandler("User already exists", 409);
        const hashedPassword = bcrypt.hashSync(password, 10)
        const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *'
        const values = [username, email.toLowerCase(), hashedPassword]
        const result = await queryDatabase(query, values)
        const { password:userPassword, ...rest} = result.rows[0]
        const info = {
            message: 'User created Successfully',
            user: rest
        }
        return responseHandler(info, 201)
    } catch (error) {
        return errorHandler(error, 500)
    }
}