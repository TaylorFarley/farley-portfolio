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
 console.log(req)
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'twfarley88@gmail.com', // Change to your recipient
  from: 'admin@twfmade.ca', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: `email from ${req.body.email} wanted to know ${req.body.message}`,
  html: `email from ${req.body.email} wanted to know ${req.body.message}`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
    console.error(error.response.body)
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
    console.log('we running ok! on ' + port)
})