const numCPUs = require('os').cpus().length;
const getInfo = (req, res) => {
  let info = {
    args: process.argv,
    platform: process.platform,
    version: process.version,
    memory: JSON.stringify(process.memoryUsage()),
    path: process.execPath,
    pid: process.pid,
    cwd: process.cwd(),
    CPUS: numCPUs
  }
  res.json(info);
};

module.exports = getInfo;