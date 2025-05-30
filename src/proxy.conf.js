const { env } = require('process');

const target = env["services__aureo-server__https__0"] ?? 'https://localhost:7193';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
