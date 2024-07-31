import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT||3000
const MONGODB_URL = process.env.NODE_ENV==='test'? process.env.TEST_MONGODB_URL:process.env.MONGODB_URL
const SALT = process.env.SALT
const SECRET = process.env.SECRET
export {PORT, MONGODB_URL, SALT, SECRET}