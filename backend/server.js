require('dotenv').config();


const express = require('express');
const usersRoutes = require('./routes/users');
const app = express();

const cors = require('cors');
app.use(cors());


const axios = require('axios')
app.use(express.json());


app.use((req,res,next)=>{
  console.log("hellothere");
  next();

});


app.use("/users/api",usersRoutes);


app.listen(process.env.PORT, () => {
  console.log('Up and running!!');
});




