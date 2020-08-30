const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
 

const port = process.env.PORT || 3000
const pathJoin = path.join(__dirname, '../public')

app.use(express.static(pathJoin))


app.get('/', async (req, res) => {

  res.render('index')


})

app.get('/contact', async (req, res) => {

  res.render('contact')


})


app.listen(port, ()=>{
    console.log('we running ok!')
})