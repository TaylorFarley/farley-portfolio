const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const port = process.env.PORT || 3000
const pathJoin = path.join(__dirname, '../public')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const viewPath = path.join(__dirname, '../templates/')
app.set('view engine', 'ejs')
app.set('views', viewPath)


app.use(express.static(pathJoin))


app.get('/', async (req, res) => {

  res.render('index')


})

app.post('/sendEmail', async (req, res) => {
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });


  let email = req.body.email
  let message = req.body.name + ' wanted to know.. ' +req.body.message
  var mailOptions = {
    from: email,
    to: 'twfarley88@hotmail.com',
    subject: 'New Message From TWFMADE',
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
  res.redirect('/sent');
})


app.get('/contact', async (req, res) => {

  res.render('contact')


})

app.get('/sent', async (req, res) => {

  res.render('sent')


})


app.listen(port, ()=>{
    console.log('we running ok!')
})