const jwtSecret = process.env.JWT_SECRET

const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' })