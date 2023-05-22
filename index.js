const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv').config()
const morgan=require("morgan")
const db=require('./config/db')
const server=express()
const passport=require('passport')
const session =require('express-session')

server.use(express.json())
server.use(cors(
  origin="https://wonderful-phoenix-85e436.netlify.app"
))

server.use(morgan('dev'))
// database
db();

// setup port for server app
const PORT=process.env.PORT || 5000
server.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})

server.use("/api", require("./routes/user"));
server.use('/api/vendor', require('./routes/vendor'))


// Express session middleware
server.use(
    session({
      secret: '1234',
      resave: false,
      saveUninitialized: false,
    })
  );

require('./config/passport')


// Passport middleware
server.use(passport.initialize());
server.use(passport.session());
