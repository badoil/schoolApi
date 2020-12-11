const express = require('express');
const router = express.Router();
const school = require('../models/school')
const student = require('../models/student')
const db = require('../components/db')
const JWT = require('../libs/jwt/index')
const crypto = require('../components/crypto')


router.post('/', async function (req, res) {
    const connection = await db.beginTransaction()        
    try{
        const newStudent = req.body;
        console.log('newStudent : ', newStudent)
        const schoolResult = await school.getList({schoolName : newStudent.school})
        console.log('schoolResult : ',schoolResult)
        if(schoolResult.length == 0){
            throw {status: 404, errorMessage: 'School not found'}            
        } 
        const studentResult = await student.getList({name:newStudent.name})
        if(studentResult.length != 0){
            throw {status: 409, errorMessage: 'Duplicate user name'}            
        }    
        const {salt, encodedPw} = crypto.createPasswordPbkdf2(newStudent.pwd)
        newStudent.salt = salt
        newStudent.pwd = encodedPw

        const results = await student.insert(connection, newStudent)
        console.log("userIndex : ",results.insertId)
        const tokens = await JWT.createToken({idx: results.insertId, name: student.name})
        console.log("tokens : ",tokens)
        newStudent.token = tokens.accessToken
        console.log("newStudent : ",newStudent)
        const updateResults = await student.update(connection, {options:newStudent, idx:results.insertId})
        
        await db.commit(connection);
        res.status(200).json({result:updateResults})
    } catch (err) {
        console.log('err : ',err)
        await db.rollback(connection)
        next(err)
    }
})

router.post('/signin', async function (req, res) {
    const connection = await db.beginTransaction()        
    try{
        const newStudent = req.body;
        const result = await student.getList({id : newStudent.id, pwd : newStudent.pwd})
        if(result.length == 0){
            throw {status: 404, errorMessage: 'User not found'}
        } 
        console.log("result : ",result)
        console.log("result[0] : ",result[0])        
        let newResult = result[0]
        delete newResult.pwd
        res.status(200).json({result:newResult})
    } catch (err) {
        console.log('err : ',err)
        await db.rollback(connection)
        next(err)
    } 
})

router.put('/', async function (req, res) {
    const connection = await db.beginTransaction()
    try{
        const jwtToken = await JWT.decodeToken(req.headers.authorization)
        req.idx = jwtToken.sub
        console.log('idx : ',req.idx)
        console.log('name : ',jwtToken)
        let originStu = await student.getList({idx : req.idx})
        console.log('originStu : ',originStu)
        const authorization = `Bearer ${originStu[0].token}`
        console.log('authorization : ',authorization)
        if(authorization !== req.headers.authorization) {
            throw {status: 401, errorMessage: 'Invalid token'}
        }
        const newStudent = req.body;        
        const results = await student.update(connection, {options:newStudent, idx:req.idx})
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
        const results = await student.delete(connection, json.idx)
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
    let user = req.query.user;
    try{
        let result = await student.getList({name : user})
        if(result.length == 0){
            throw {status: 404, errorMessage: 'Student not found'}            
        } 
        console.log('stduent : ', result)
        let schoolName = result[0].school
        const schoolResult = await school.getList({schoolName : schoolName})
        console.log('schoolResult : ', schoolResult)
        result[0].schoolResult = schoolResult[0]
        res.status(200).json({result:result[0]})
    } catch (err) {
        console.log('err : ',err)
        next(err)
    }
})


module.exports = router;