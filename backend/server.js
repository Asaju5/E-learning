import express from 'express'
import {readdirSync} from 'fs'
import cors from 'cors'
import mongoose from 'mongoose'
const morgan = require('morgan')
require('dotenv').config()


//create express app
const app = express()

//apply middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//connect mongodb
const URI = process.env.MONGO_DB
mongoose.connect(URI, {
useCreateIndex: true,
useFindAndModify: false,
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => console.log('Connected to Databse'))
.catch((err) => console.log(err))


 
//routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))


const port = process.env.PORT || 4000
app.listen(port, (req, res) => {
    console.log(`Server is running on: ${port}`);
})
