require('dotenv').config()
const cors = require('cors')
const multer = require('multer')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3003 || process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(`${process.env.MONGODB_URI}`).then(()=>console.log('Connected to database'))

const imageScheme = new mongoose.Schema({
    name: String,
    image: ({
        data: Buffer,
        contentType: String
    })
})

const ImageModel = new mongoose.Model('ImageModel', imageScheme)


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads')
    },
    filename: (req, file, cb) =>{
        cb(null, file.filename + Date.now())
    }
}) 

const upload = multer({storage: storage})

app.listen(PORT, ()=> console.log('Server is live:' + PORT))