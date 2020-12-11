const db = require('../components/db')


module.exports.getList = async (options) => {
    console.log('options : ',options)

    let query = 'SELECT * FROM students'
    let value;
    if(options.name){
        query += ' WHERE name = ?'
        value = options.name        
    }
    if(options.id && options.pwd){
        query += ' WHERE id = ? AND pwd = ?'
        value = [options.id, options.pwd]
    }

    if(options.idx){
        query += ' WHERE idx = ?'
        value = options.idx
    }
    return await db.query({
        query: query,
        value: value
    })
       
};



module.exports.insert = async (connection, options) => {
    console.log('options : ',options)
    return await db.query({
        connection:connection,
        query: 'INSERT INTO students SET ?',
        value: options
    })  
};

module.exports.update = async (connection, options) => {
    console.log('options : ',options)
    return await db.query({
        connection:connection,
        query: 'UPDATE students SET ? WHERE idx = ?',
        value: [options.options, options.idx]
    })  
};


module.exports.delete = async (connection, options) => {
    console.log('options : ',options)
    return await db.query({
        connection:connection,
        query: 'DELETE FROM students WHERE idx = ?',
        value: [options]
    })  
};