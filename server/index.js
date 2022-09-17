require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3003 || process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>console.log('Connected to database'))


app.listen(PORT, ()=> console.log('Server is live:' + PORT))