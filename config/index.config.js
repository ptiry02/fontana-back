import express from 'express'
import logger from 'morgan'
import cors from 'cors'

// Middleware configuration
export default app => {
  // Because this is a server that will accept requests from outside and it will be hosted ona server with a `proxy`,
  // express needs to know that it should trust that setting.
  app.set('trust proxy', 1)

  // Controls a very specific header to pass headers from the frontend.
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || 'http://localhost:3000',
    })
  )

  // In development enviroment the app logs
  app.use(logger('dev'))
  // To have acces to `body` property in the request
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}
