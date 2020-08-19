const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
 
let port = 3000 || process.env.PORT
 
const pathJoin = path.join(__dirname, '../public')

app.use(express.static(pathJoin))



app.listen(port, ()=>{
    console.log('we running ok!')
})