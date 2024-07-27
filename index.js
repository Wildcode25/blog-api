import { PORT } from './config/dotenvConfig.js'
import http from 'node:http'
import {app} from './config/expressApp.js'
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})