import dotenv from "dotenv"

console.log(dotenv)

export default {    
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT
}