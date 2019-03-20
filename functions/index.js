const functions = require('firebase-functions');
//import {config} from 'firebase-functions';
const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const mailing=require('./mailing.js');
const app=express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



//  // Initialize Firebase
//  var config = {
//     apiKey: process.env.FIREBASE_API_KEY,
//     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.FIREBASE_DB_URL,
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
//   };
//   firebase.initializeApp(functions.config().firebase);


app.use("/styles",express.static("../public/styles"));
app.use("/images",express.static("../public/images"));

var urlencodedParser = bodyParser.urlencoded({ extended: false });


// app.get("/",(req,res)=>{
//     res.send("<h1>Hello from firebase!</h1>");
//     res.end();
// });

app.get("/",(req,res)=>{
    
    res.sendfile(path.join(__dirname,'index.html'));
    //res.end();
});


app.post("/registration",urlencodedParser, (req,res)=>{
    if(!req.body) return res.sendStatus(400);
    var data=req.body;
    console.log(data);
    if(mailing.registrationMailing(data)===200){
        res.render('acknowledgement.ejs',{
            title: "Registration",
            name:data.registrationName,
            mailId: data.registrationMail,
            success: true
        });
    }
    else{
        res.render('acknowledgement.ejs',{
            title: "Registration",
            name:data.registrationName,
            mailId: data.registrationMail,
            success: false
        });
    }
    res.end();
    
});



app.post("/query",urlencodedParser, (req,res)=>{
    if(!req.body) return res.sendStatus(400);
    var data=req.body;
    console.log(data);
    
    if(mailing.queryMailing(data)===200){
        res.render('acknowledgement.ejs',{
            title: "Query",
            name: data.queryName,
            mailId: data.queryMail,
            success: true
        });
        
    }
    else{
        res.render('acknowledgement.ejs',{
            title: "Query",
            name:data.queryName,
            mailId: data.queryMail,
            success: false
        });
        
    }
    res.end();
    
});


exports.service = functions.https.onRequest(app);
