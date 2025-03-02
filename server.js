const express = require('express');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const connectDB = require('./config/db');
const hospitals = require('./routes/hospitals');
const appointment = require('./routes/appointment');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');

//Load Env
dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/appointments',appointment);
app.use('/api/v1/auth',auth);
app.use(cookieparser());



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log('Server running in ',process.env.NODE_ENV,' mode on port ',PORT));

process.on('unhandledRejection',(err,Promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})
