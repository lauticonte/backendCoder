const logger = require('./logger');
const autocannon = require('autocannon');

function run(url) {
  const buf = []
  const inst = autocannon({
    url,
    connections:100,
    duration: 20
  })
}

logger.info('Ejecutando tests')

run('http://localhost:8080/info')