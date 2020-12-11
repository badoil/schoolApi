'use strict'

const fcm = require('./firebase/index')

module.exports.sendToTopic = async (options) => {
  return new Promise(function (resolve, reject) {
    try {
      // console.log('sendToTopic : ',options)
      // console.log(options)
      fcm.messaging().send(options)
      .then(function(response){
        console.log('response : ',response)
        resolve(true)
      })
      .catch(function(err){
        reject(err)
      })
    }
    catch (err) {
      throw new Error(err)
      // console.log(err)
    }
  })
  
}


module.exports.testSendToTopic = async (options) => {
  try {
    message = {
      notification: {
        title: 'push.contents'
      },
      data: {
        title :' push.title',
        contents:'push.contents',
        link:'asdf'
      },
      topic: 'asdf',
      badge:"1"
    }
    fcm.messaging().send(message).then()
  }
  catch (err) {
    // console.log("push error : ", err)
    throw new Error(err)
  }
}


