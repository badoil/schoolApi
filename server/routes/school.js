var express = require('express');
var router = express.Router();
var db = require('../components/db')
var school = require('../models/school')


router.post('/',async function (req, res) {
    const connection = await db.beginTransaction()        
    try{
        const newSchool = req.body;
        const results = await school.insert(connection, newSchool)
        await db.commit(connection);
        if(results){
            res.status(200).json({result:results})
        }
    } catch (err) {
        console.log('err : ',err)
        await db.rollback(connection)
        next(err)
    }
})

router.put('/', async function (req, res) {
    try{
        const json = req.body;
        const connection = await db.beginTransaction()
        var newSchool  = {name: json.name, address: json.address, type:json.type,};
        const results = await school.update(connection, {options:newSchool, idx:json.idx})
        await db.commit(connection);
        if(results){
            res.status(200).json({result:results})
        }
    } catch (err) {
        console.log('err : ',err)
        await db.rollback(connection)
        next(err)
    }  
})

router.delete('/', async function (req, res) {
    const json = req.body;
    try{
        const json = req.body;
        const connection = await db.beginTransaction()
        const results = await school.delete(connection, json.idx)
        await db.commit(connection);
        if(results){
            res.status(200).json({result:results})
        }
    } catch (err) {
        console.log('err : ',err)
        await db.rollback(connection)
        next(err)
    }  
})

router.get('/', async function (req, res) {
    const schoolName = req.query.schoolName ? req.query.schoolName : ""
    const results = await school.getList({schoolName:schoolName})
    console.log('success')
    res.status(200).json({result:results})            
})




module.exports = router;