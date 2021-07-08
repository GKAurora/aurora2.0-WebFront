import auth from './auth'
import sdn from './sdn'
import server from './server'

const API = {
  // server: 'http://c4.farmer233.top:6767',
  server: 'http://127.0.0.1:5000',
  tokenPrefix: 'Bearer ',
  auth: auth,
  sdn: sdn,
  sys: server
}
export default API
