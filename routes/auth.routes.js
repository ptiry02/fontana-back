import { Router } from 'express'
import Admin from '../models/Admin.model.js'
import bcrypt from 'bcrypt'
import isAuthenticated, { tokenSecret } from '../midleware/jwt.middleware.js'
import jwt from 'jsonwebtoken'

const authRouter = Router()

const saltRounds = 10

authRouter.post('/login', async (req, res) => {
  const { name, password } = req.body

  try {
    const user = await Admin.findOne({ name })

    if (!user) {
      throw { message: 'Wrong user, try again...' }
    }

    const checkPass = await bcrypt.compare(password, user.password)

    if (!checkPass) {
      return res.status(400).json({ message: 'Incorrect password, try again...' })
    }

    const payload = { id: user._id, user: user.name }

    const token = jwt.sign(payload, tokenSecret, { algorithm: 'HS256', expiresIn: '1h' })
    res.cookie('access_token', token, { httpOnly: true, signed: true })

    res.status(201).json({ status: true, code: 201, user: { name: user.name, id: user.id }, message: 'Welcome!' })
  } catch (err) {
    console.log('Error at login: ', err)
    res.status(401).json({ status: false, code: 401, message: err.message })
  }
})

authRouter.post('/signup', async (req, res) => {
  const { name, password } = req.body

  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPass = await bcrypt.hash(password, salt)

    await Admin.create({ name, password: hashedPass })

    res.status(200).json({ status: 'success', message: `New admin created with name ${name}` })
  } catch (err) {
    console.log('Error in signup: ', err)
    res.status(401).json({ status: false, message: 'Failed to create Admin' })
  }
})

authRouter.get('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.status(200).json({ status: 'success', code: 200, message: 'Logout successful' })
})

authRouter.get('/verify', isAuthenticated, async (req, res) => {
  const { id } = req.payload

  try {
    const user = await Admin.findById(id, { password: 0 })
    res.status(201).json({ status: true, code: 201, user: user.name, id: user.id })
  } catch (err) {
    console.log('There has been an error: ', err)
    res.status(401).json({ status: false, code: 401, message: 'Unauthorised access!' })
  }
})

export default authRouter
