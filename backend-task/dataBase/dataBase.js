import mysql from 'mysql2/promise'

// PAra hacer la conexión 
const SERVER_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 1234,
  password: '',
  database: 'tasktracker'
}

const connectionString = process.env.DATABASE_URL ?? SERVER_CONFIG

const connection = await mysql.createConnection(connectionString)

export default connection