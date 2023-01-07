const express = require('express');
const app = express();
const bodyParser   =  require('body-parser');
const patientRoutes = require('./api/routes/patient');
const doctorRoutes = require('./api/routes/doctor');
const authRoutes = require('./api/routes/auth');
const appointmentRoutes = require('./api/routes/appointment');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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