import mongoose from "mongoose";

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: {
        type:String,
        required:true 
    },
    body: {
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog;