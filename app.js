import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
const port=3000;

let posts=[];

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render('index',{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render('new-post');
});

app.post("/posts",(req,res)=>{
    const{title,content}=req.body;
    posts.push({id:posts.length+1,title,content});
    res.redirect('/');
});

app.get("/posts/:id/edit",(req,res)=>{
    const post=posts.find(p=>p.id == req.params.id);
    res.render('edit-post',{post});
});

app.post("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    // Assuming `posts` is your array of posts
    const post = posts.find(p => p.id == id);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    // Update the post
    post.title = title;
    post.content = content;

    // Redirect back to the home page
    res.redirect('/');
});


app.post("/posts/:id/delete",(req,res)=>{
    posts=posts.filter(p=>p.id!=req.params.id);
    res.redirect('/');
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
}); 