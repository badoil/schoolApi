const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync(`${__dirname}/private.pem`)
const publicKey = fs.readFileSync(`${__dirname}/public.pem`)
const privateRefreshKey = fs.readFileSync(`${__dirname}/private-ref.pem`)
const publicRefreshKey = fs.readFileSync(`${__dirname}/public-ref.pem`)

module.exports.createToken = async (data) => {
  try {
    const payload = {
      aud: data.name,
      sub: data.idx
    }
    const accessToken = await generateToken(payload)
    const refreshToken = await generateToken(payload, true)
    return {accessToken, refreshToken}
  } catch (err) {
    throw err
  }
}

async function generateToken(payload, isRefresh) {
  try {
    return await jwt.sign(payload, (isRefresh ? privateRefreshKey : privateKey),
      {
        algorithm: 'RS256',
        expiresIn: isRefresh === true ? 60 * 60 * 24 :  60 * 60 * 24
      })
  } catch (err) {
    throw err
  }
}

module.exports.decodeToken = async (token) => {
  try {
    if (token && token.split(' ')[0] === 'Bearer') {
      return await jwt.verify(token.split(' ')[1], publicKey, {algorithms: 'RS256'})
    }
    else {
      throw 'AccessToken is empty'
    }
  } catch (err) {
    throw {status: 401, errorMessage: err}
  }
}

module.exports.decodeRefreshToken = async (token) => {
  try {
    if (token) {
      return await jwt.verify(token, publicRefreshKey, {algorithms: 'RS256'})
    }
    else {
      throw 'AccessToken is empty'
    }
  } catch (err) {
    throw {status: 401, errorMessage: err}
  }
}

module.exports.refreshToken = async (options) => {
  try {
    const payload = await jwt.verify(options.accessToken, publicKey, {algorithms: 'RS256', ignoreExpiration: true})
    await jwt.verify(options.refreshToken, publicRefreshKey, {algorithms: 'RS256'})
    delete payload.iat
    delete payload.exp
    delete payload.nbf
    delete payload.jti
    return await generateToken(payload)
  } catch (err) {
    throw {status: 401, errorMessage: err}
  }
}

module.exports.decodeSocketToken = async (token) => {
  try {
    return await jwt.verify(token.split(' ')[1], publicKey, {algorithms: 'RS256'})
  } catch (err) {
    // console.log('invalid_token')
    throw 'invalid_token'
  }
}
