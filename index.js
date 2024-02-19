import express from "express";
import dotenv from 'dotenv';
import expressLayout from 'express-ejs-layouts';
import  methodOverride from "method-override";
import mainRouter from './server/routes/main.js';
import adminRouter from './server/routes/admin.js';
import connectDB from './server/config/db.js';
import cookieParser from "cookie-parser"; 
import MongoStore from "connect-mongo"; 
import session from "express-session";

dotenv.config();



const app = express();
const port = 3000;

//Connect to Database
connectDB();

//Using MiddleWares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser()); 
app.use(methodOverride('_method'));

app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store: MongoStore.create({
        mongoUrl : process.env.MONGODB_URI
    })
}))

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine','ejs');

// GET admin and main Routers
app.use('/', mainRouter);
app.use('/', adminRouter);


// CREATE SERVER
app.listen(port,()=>{
    console.log(`Server running on port : ${port}`);
})



// ONLY ADD IF I WANT TO MAKE REGISTER IN MY SITE

// import cookieParser from "cookie-parser"; 
// import MongoStore from "connect-mongo"; 
// import session from "express-session";

// app.use(cookieParser()); 

// app.use(session({
//     secret : 'keyboard cat',
//     resave : false,
//     saveUninitialized : true,
//     store: MongoStore.create({
//         mongoUrl : process.env.MONGODB_URI
//     })
// }))