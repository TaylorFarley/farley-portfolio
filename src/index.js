const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
 

 
const pathJoin = path.join(__dirname, '../public')

app.use(express.static(pathJoin))



app.listen(3000, ()=>{
    console.log('we running ok!')
})