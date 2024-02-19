import express from "express";
import Blog from "../models/blogs.js";
const router = express.Router();


/**
 * GET /
 * HOME
 */

router.get("/",async (req, res) => {  
    try{
      const locals ={
        title:"BlogPage",
        description:"This is a blog page with node.js"
       }

        let perPage = 5;
        let page = req.query.page || 1;
        const data = await Blog.aggregate([{$sort:{createdAt:-1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Blog.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        res.render('index',{locals,
                            data,
                            current:page,
                            nextPage:hasNextPage ? nextPage : null
                          });
    }catch(error){
        console.log(error);
    }   
});

/**
 * GET /
 * Blog : id
 */

router.get("/blog/:id",async (req, res) => {  
    try{
       let slug = req.params.id;
       const data = await Blog.findById({_id:slug});

       const locals ={
        title: data.title,
        description:"This is a blog page with node.js"
       }      

        res.render('blog',{locals , data});
    }catch(error){
        console.log(error);
    }   
});

/**
 * GET /
 * Blog : searchTerm
 */
router.post("/search",async (req, res) => {  
    try{ 
        const locals ={
            title: "Search",
            description:"This is a blog page with node.js"
           } 
        
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
        const data = await Blog.find({
            $or: [
                { title: {$regex:new RegExp(searchNoSpecialChar, 'i')}},
                { body: {$regex:new RegExp(searchNoSpecialChar, 'i')}},
            ]
    });
        
       res.render("search",{
        data,
        locals
       });
    }catch(error){
        console.log(error);
    }   
});



router.get("/about", (req, res) => {
    res.render('about');
});

router.get("/contact", (req, res) => {
    res.render('contact');
});

export default router;


//Simple Function to Test the Connection

// function insertBlogData () {
//       Blog.insertMany([
//         {
//           title: "Building APIs with Node.js",
//           body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//         },
//         {
//           title: "Deployment of Node.js applications",
//           body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//         }])}