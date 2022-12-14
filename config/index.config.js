import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import cookieParser from 'cookie-parser'

const front = process.env.ORIGIN || 'http://localhost:3000'
const cookieSecret = process.env.COOKIE_SECRET || 'topSecret!'

// Middleware configuration
export default app => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`,
  // express needs to know that it should trust that setting.
  app.set('trust proxy', 1)

  // Controls a very specific header to pass headers from the frontend.
  app.use(
    cors({
      credentials: true,
      origin: front,
    })
  )
  app.use(
    rateLimit({
      windowMs: 1000,
      max: 100,
      message: 'You have exceeded the limit of 100 calls in 1 second! Please slow down or you might break the server.',
      standardHeaders: true,
      legacyHeaders: false,
    })
  )

  // In development enviroment the app logs
  app.use(logger('dev'))
  // To have acces to `body` property in the request
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(cookieParser(cookieSecret))
}
