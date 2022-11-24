import { expressjwt } from 'express-jwt'

const getToken = req => {
  const auth = req.headers.authorization
  if (!auth || auth.split(' ')[0] !== 'Bearer') return null
  return auth.split(' ')[1]
}

export default expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken,
})
