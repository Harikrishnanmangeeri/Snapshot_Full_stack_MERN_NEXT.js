const express = require('express')
// const cors = require('cors')
const mongoose =require('mongoose')
const app = express()
const userRouter=require('./route/user.route')
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/snapshot').then(console.log('connected'))


app.use('/api',userRouter)
app.listen(3001 , ()=>console.log("server on"))
