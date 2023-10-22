require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const workoutRoutes = require('./routes/workouts')

// middle ware allows to access body of req
app.use(express.json())

// middle ware
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/workouts',workoutRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI).then(()=>{
    console.log("Connection Successfull to DB!")
    // start the server on PORT through .env port number
    app.listen(process.env.PORT, () =>{
    console.log("listning on port ",process.env.PORT,"!!! !")
})
}).catch((error)=>{
    console.log(error)
})

