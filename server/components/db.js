'use strict'

const config = require('../config')
const mysql = require('mysql')

var pool  = mysql.createPool({
  connectionLimit : config.database.connectionLimit,
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
});

module.exports.query = (options) => {
  return new Promise((resolve, reject) => {
    // pool.getConnection(function(err, connection) {
    //   if (err) reject(err); // not connected!
      let connection = options.connection ? options.connection : pool
      connection.query(options.query, options.value,  function (error, results, fields) {
        if (error) {                    
            reject(error)
        }                           
          resolve(results);        
      });
    });
  // });    
}


module.exports.beginTransaction = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err); // not connected!
          // Use the connection
      connection.beginTransaction(function(err) {
          if (err) { reject(err); }
          resolve(connection)
      });
    });
  })
}

module.exports.commit = (connection) => {
  return new Promise((resolve, reject) => {
    connection.commit(err => {
      console.log("this : ", this)
      if (err) reject(this.rollback(connection))
      else {
        connection.release()
        resolve()
      }
    })
  })
}

module.exports.rollback = (connection) => {
  return new Promise((resolve, reject) => {
    connection.rollback(err => {
      if (err) reject(err)
      else {
        connection.release()
        resolve()
      }
    })
  })
}

module.exports.rollback2 = (connection) => {
  return new Promise((resolve, reject) => {
    connection.rollback(err => {
      if (err) reject(err)
      else {
        connection.release()
        resolve()
      }
    })
  })
}
