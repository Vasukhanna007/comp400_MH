const express = require('express');
const app = express();
const bodyParser   =  require('body-parser');
const patientRoutes = require('./api/routes/patient');
const doctorRoutes = require('./api/routes/doctor');
const authRoutes = require('./api/routes/auth');
const appointmentRoutes = require('./api/routes/appointment');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/auth', authRoutes);
app.use('/appointment', appointmentRoutes);


//error handling
// app.use((req,res,next) => {
//     const error = new Error('Not  found')
//     error.status= 404;
//     next(error);
// })

// app.use((error, req, res, next)=> {
//     res.status(res.err|| 500);
//     res.json({
//         error:{
//             message:error.message
//         }
//     })
// })

module.exports= app;