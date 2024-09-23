import cors from 'cors'

export const corsMiddlewares = () => cors({
  origin: '*' // Permitir cualquier origen
})