const express = require('express');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const connectDB = require('./config/db');
const campgrounds = require('./routes/campgrounds');
const reserves = require('./routes/reserves');
const auth = require('./routes/auth');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

//Load Env
dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();

app.use(express.json());
app.use(mongoSanitize());

app.use('/api/v1/campgrounds',campgrounds);
app.use('/api/v1/reserves',reserves);
app.use('/api/v1/auth',auth);
app.use(cookieparser());



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log('Server running in ',process.env.NODE_ENV,' mode on port ',PORT));

process.on('unhandledRejection',(err,Promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})
