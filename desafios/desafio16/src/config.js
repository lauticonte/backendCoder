const yargs = require('yargs/yargs')(process.argv.slice(2))
require('dotenv').config()
const MONGOURL = process.env.MONGOURL
const PORT = yargs.alias({
  p: 'puerto',
  m: 'modo'
})
.default({
  puerto: 8080,
  modo: 'FORK'
}).argv

module.exports = {MONGOURL, PORT};