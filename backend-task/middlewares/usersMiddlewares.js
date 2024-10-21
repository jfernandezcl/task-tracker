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
    if (error)
      if (err) return res.sendStatus(403); // Token inválido, retorno 403
    req.user = user;
    next(); // Continuar al siguiente middleware
  })
}