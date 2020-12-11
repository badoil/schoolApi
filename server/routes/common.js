var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const s3 = require('../components/s3')
var mime = require('mime-types')


router.get('/fileUploadUrl', async function(req, res, next) {    
  console.log('fileUploadUrl')
  const {mimetype, extension} = req.query
  let path = `test.${extension}`
  // let path = `test.png`
  const url = s3.generatePreSignedUrl({
    key: path,
    mimetype: mimetype
  })
  console.log('url: ',url)
  // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
  res.status(200).json({url, path})
});

router.get('/getExtension', async function(req, res, next) {    
  console.log('getExtension')
  const {type} = req.query
  let extension= mime.extension(type) 
  if(type == 'hwp'){
      extension = 'hwp';
  }
  // console.log('extension : ',extension)
  res.status(200).json({extension: extension });
});


async function sendEmail(){

  let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'developer@team-everywhere.com', // generated ethereal user
        pass: '1qaz2wxx' // generated ethereal password
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'developer@team-everywhere.com', // sender address
      to: "da224@naver.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });

}

router.get('/sendEmail', async function(req, res, next) {    
  sendEmail();
  res.send('Mail sent')    
});

module.exports = router;