import {} from 'dotenv/config'
import express from 'express'
import appConfig from './config/index.config.js'
import connectDB from './database/index.db.js'
import allRoutes from './routes/index.routes.js'

// Start express framework
const app = express()

// Set configurations from config folder and connect to database.
appConfig(app)

connectDB()

// Start handling routes
app.use('/api', allRoutes)

export default app
