import express from "express"
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import profileRoutes from './routes/profile.routes'
import feedRoutes from './routes/feed.routes'
import authRoutes from './routes/auth.routes'

// Inicialization
const app = express()
// Settings
app.set('port', process.env.PORT || 8080)
// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
// var corsOptions = {
//     origin: '*', // Aqui debemos reemplazar el * por el dominio de nuestro front
//     optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
// }
// app.use(cors(corsOptions));
// Routes
app.use(profileRoutes)
app.use(feedRoutes)
app.use(authRoutes)
// Static files
app.use(express.static(path.join(__dirname, 'public')))


export default app;