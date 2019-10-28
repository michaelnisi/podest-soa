const https = require('https')

exports.handler = async (event) => {
  try {
    let res = await new Promise((resolve, reject) => {
      let req = https.request({
        method: 'PUT',
        port: 443,
        hostname: 'fanboy.codes.ink',
        path: '/feeds'
      })

      req.on('response', res => {
        resolve(res);
      })

      req.on('error', err => {
        reject(err);
      })

      req.end()
    })

    return {
      statusCode: res.statusCode,
      body: JSON.stringify({
        ts: new Date(),
        message: 'OK'
      })
    }
  } catch (error) {
    return {
      statusCode: 503,
      body: JSON.stringify({
        ts: new Date(),
        message: 'Not OK',
        error: error
      })
    }
  }
}