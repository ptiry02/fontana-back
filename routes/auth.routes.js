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
      res.status(404).json('No user found')
    }

    const checkPass = await bcrypt.compare(password, user.password)

    if (!checkPass) {
      return res.status(400).json({ message: 'Incorrect password, try again...' })
    }

    const payload = { id: user._id, user: user.name }

    const token = jwt.sign(payload, tokenSecret, { algorithm: 'HS256', expiresIn: '8h' })
    res.cookie('access_token', token, { httpOnly: true, signed: true })

    res.status(200).json({ status: 'success', code: 200, user: user.name, message: 'Welcome!' })
  } catch (err) {
    console.log('Error at login: ', err)
    res.json({ error: err, message: 'Something went wrong...' })
  }
})

authRouter.post('/signup', async (req, res) => {
  const { name, password } = req.body

  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPass = await bcrypt.hash(password, salt)

    await Admin.create({ name, password: hashedPass })

    res.json({ status: 'success', message: `New admin created with name ${name}` })
  } catch (err) {
    console.log('Error in signup: ', err)
    res.status(400).json({ status: 'error', error: err, message: 'Failed to create Admin' })
  }
})

authRouter.post('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.status(200).json({ status: 'success', code: 200, message: 'Logout successful' })
})

authRouter.get('/verify', isAuthenticated, async (req, res) => {
  const { id } = req.payload

  try {
    const user = await Admin.findById(id, { password: 0 })
    res.status(200).json(user)
  } catch (err) {
    console.log('There has been an error: ', err)
    res.status(404).json({ status: 'failed' })
  }
})

export default authRouter
