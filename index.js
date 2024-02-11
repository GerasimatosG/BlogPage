import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs",);
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
});



// HANDLE CONTACT FORM
app.post("/submitForm", (req, res) => {
    res.render("contact.ejs", { submitted: true });
});

// HANDLE POST CREATION
app.post("/submit", (req, res) => {
    
    const { subject , content , imageDataURL } = req.body;

    // Construct the HTML for the new blog post
    const newPostHTML = `
        <div class="card" style="width: 18rem;">
             <img src="${imageDataURL}" class="card-img-top" alt="icon">
            <div class="card-body">
                <h5 class="card-title">${subject}</h5> 
                <div class = "blogContent">
                    <p>${content}</p>
                </div>
                <a href="#" class="btn btn-primary">Read Blog</a>
            </div>
        </div>`;

    // Send the HTML response back to the client
    res.send(newPostHTML);
});


// CREATE SERVER
app.listen(port,()=>{
    console.log(`Server running on port : ${port}`);
})