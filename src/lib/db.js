import pg from "pg";
import fs from 'fs'
import path from "path";

const pool = new pg.Pool({
    user: 'avnadmin', 
    password: process.env.PASSWORD, 
    host: `pg-27537501-ticket-booking-demo.b.aivencloud.com`, 
    port: 21607,
    database: `defaultdb`, 
    application_name: `ticketBooking`,
    ssl: {
        rejectUnauthorized: true,
        // ca: fs.readFileSync(path.join(__dirname, '../../../lib/ca.pem'))
        ca: process.env.CA
    },

})

// export const connectToDataBase = async() => {
//     try {
//         client.connect(function (err) {
//             if (err)
//                 throw err;
//             client.query("SELECT VERSION()", [], function (err, result) {
//                 if (err)
//                     throw err;
        
//                 console.log(result.rows[0].version);
               
//             });
//         });
//                 const createTableQuery = `
//                 CREATE TABLE IF NOT EXISTS users (
//                     id SERIAL PRIMARY KEY,
//                     username VARCHAR(50)  NOT NULL,
//                     email VARCHAR(100)  NOT NULL,
//                     password VARCHAR(255) NOT NULL,
//                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//                 );`;
//                 await client.query(createTableQuery)
//         console.log("connected to DB!")
//     } catch (error) {
//         console.error(error.message || "Not able to connect to DB")
//     }
// }

export const queryDatabase = async (text, params) => {
     const client = await pool.connect();  // Use pool to get a client
    try {
      const res = await client.query(text, params);  // Execute query
      return res;
    } finally {
      client.release();  // Make sure to release the client back to the pool
    }
  };


export {pool}