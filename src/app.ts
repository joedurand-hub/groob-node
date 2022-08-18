import express from "express"
import path from 'path'
import http from "http"
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import cors from 'cors'
import authRoute from './routes/auth.routes'
import feedRoute from './routes/feed.routes'
import profileRoute from './routes/profile.routes'
import searchRoute from './routes/search.routes'
import followRoute from './routes/follow.routes'
import chatRoute from './routes/chat.routes'
import messagesRoute from './routes/messages.routes'
import sockets from "./sockets"

// Inicialization
const app = express()
const server = http.createServer(app)
const socketIo = sockets(server)

// export instance for new sockets in endpoints
export const io = socketIo;

// Settings
app.set('port', process.env.PORT || 8080)

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
var corsOptions = {
    origin: 'http://localhost:3000', // Aqui debemos reemplazar el * por el dominio de nuestro front
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions));

// Routes
app.use(authRoute)
app.use(profileRoute)
app.use(feedRoute)
app.use(searchRoute)
app.use(followRoute)
app.use(chatRoute)
app.use(messagesRoute)

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.static(path.join(__dirname, 'public')))

export default server;