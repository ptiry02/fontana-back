import { expressjwt } from 'express-jwt'

export const tokenSecret = process.env.TOKEN_SECRET || 'superTopSecret!'

const getToken = req => {
  const token = req.signedCookies.access_token
  if (!token) return null
  return token
}

export default expressjwt({
  secret: tokenSecret,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken,
})
