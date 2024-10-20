import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET

// Middleware para verificar el token
export const authenticateToken = (req, res, next) => {
  // obtener el token de las cookies o el encabezado
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' })
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.status(403).json({ error: 'Invalid token.' })
    }
    req.user = user // guardar el usuario en la solicitud
    next()
  })
}