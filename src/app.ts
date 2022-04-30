import express from "express"
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import usersRoutes from './routes/users.routes'
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
// Routes
app.use(usersRoutes)
app.use(feedRoutes)
app.use(authRoutes)
// Static files
app.use(express.static(path.join(__dirname, 'public')))


export default app;