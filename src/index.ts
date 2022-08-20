import dotenv from 'dotenv'
dotenv.config()
import server from "./app"
import './database'

server.listen(8080, () => {
    console.log(`app on port 8080`) 
})
