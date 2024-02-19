import express from "express";
import User from "../models/users.js";
import Blog from "../models/blogs.js";
import bcrypt from "bcrypt"; 
import jwt  from "jsonwebtoken"; 

const router = express.Router();
const adminLayout = '../views/layouts/admin';

const jwtSecret = `${process.env.JWT_SECRET}`

/**
 * 
 * Admin - Check Login
 * This will protect our Page 
 */

const authMiddleware = (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorised"});
    }

    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        next();
    }catch(error){
        return res.status(401).json({message : "Unauthorised"});
    }
}




/**
 * GET /
 * Admin - Login Page
 */

router.get("/admin",async (req, res) => {  
    try{    
       const locals ={
        title: "Admin",
        description:"This is a blog page with node.js"
       }     

        res.render('admin/index',{locals, layout: adminLayout});
    }catch(error){
        console.log(error);
    }   
});

/**
 * POST /
 * Admin - Check Login
 */

router.post("/admin",async (req, res) => {  
    try{    
       const{ username , password } = req.body;

       const user = await User.findOne({ username });
       
       if(!user){
        return res.status(401).json({message : "Invalid credentials"});
       }

       const isPasswordValid = await bcrypt.compare(password, user.password);
       
       if(!isPasswordValid){
        return res.status(401).json({message : "Invalid credentials"});
       }

       const token = jwt.sign({ userId: user._id }, jwtSecret);
       res.cookie('token',token,{httpOnly:true});

       res.redirect('/dashboard');

        
    }catch(error){
        console.log(error);
    }   
});


/**
 * GET /
 * Admin Dashboard
 */

router.get("/dashboard",authMiddleware,async (req, res) => {  

    try{
        const locals ={
            title: "Dashboard",
            description:"This is a admins dashboard"}

            let perPage = 5;
            let page =req.query.page || 1;

            const data = await Blog.aggregate([{$sort:{createdAt:-1}}])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

            const count = await Blog.countDocuments();
            const nextPage = parseInt(page) + 1;
            const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        res.render('admin/dashboard', {locals,
                                       data,
                                       current:page,
                                       nextPage:hasNextPage ? nextPage : null,
                                       layout : adminLayout
          });
    }catch(error){
        console.log(error);
    }

 
});

/**
 * GET /
 * Admin - Create New Blog
 */

router.get("/addBlog",authMiddleware,async (req, res) => {  

    try{
        const locals ={
            title: "Add Blog",
            description:"This is admins dashboard"}
       
        res.render('admin/addBlog', {locals, layout: adminLayout});
    }catch(error){
        console.log(error);
    } 
});

/**
 * POST /
 * Admin - Create New Blog
 */

router.post("/addBlog",authMiddleware,async (req, res) => {  

    try{   
        const newBlog = new Blog({
            title:req.body.title,
            body:req.body.body
        });

        await Blog.create(newBlog);
        res.redirect('/dashboard');      
    }catch(error){
        console.log(error);
    } 
});


/**
 * GET /
 * Admin - Edit Blog
 */

router.get("/editBlog/:id",authMiddleware,async (req, res) => {  

    try{
        const locals ={
            title: "Edit Blog",
            description:"This is admins edit Blog page"}
        const data = await Blog.findOne({_id: req.params.id});
       
        res.render('admin/editBlog', {data, locals, layout: adminLayout});
    }catch(error){
        console.log(error);
    } 
});


/**
 * PUT /
 * Admin - Edit Blog
 */

router.put("/editBlog/:id",authMiddleware,async (req, res) => {  

    try{
        await Blog.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/dashboard`);
    }catch(error){
        console.log(error);
    } 
});


/**
 * DELETE /
 * Admin - Delete Blog
 */

router.delete("/deleteBlog/:id",authMiddleware,async (req, res) => {  
    try{
        await Blog.deleteOne({_id : req.params.id});
        res.redirect("/dashboard");
    }catch(error){
        console.log(error);
    }
});

/**
 * GET /
 * Admin - LogOut
 */

router.get("/logout",(req,res) =>{
    res.clearCookie('token');
    res.redirect("/admin")
});


//ADD THIS IF YOU WANT TO MAKE REGISTER(+a register form in admin.ejs)

// router.post("/register",async (req, res) => {  
//     try{    
//        const{ username , password } =req.body;
//        const hashedPassword = await bcrypt.hash(password,10);

//        try{
//             const user = await User.create({username , password:hashedPassword})
//        }catch(error){
//             if(error.code === 11000){
//                 res.status(409).json({message: 'User already Exists'});
//             }
//             res.status(500).json({message: 'Internal server Error'});
//        }     
//     }catch(error){
//         console.log(error);
//     }   
// });




export default router;

//FUNCTION TO INSERT OUR ADMIN
//
// function insertUser(){
//     User.insertMany([
//         {username : "admin",
//          password : "password"}
//     ])
// }

// insertUser();