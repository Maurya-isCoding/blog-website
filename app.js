import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import {dirname} from "path"
import  {fileURLToPath} from "url";
import _ from "lodash"
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000; 

app.set('views engine', 'ejs');

let posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const getMessage = "This is a general message to display on the screen of the web page to get the full attention of the people that are reading this message. Thankyou for wasting your couple of hours and glad to here"
const aboutMessage = "This is a random meassage that I want to display on the screen of the ejs file and I am glad to display it on your screen."
const contactMessage = "To contact us join on discord insta and Linked and many more links that will be provided on the screen page."

app.get("/",  (req, res)=>{
    res.render("./home.ejs",{
        message: getMessage, 
        posts: posts
    } );
})
app.get("/about",  (req, res)=>{
    res.render("./about.ejs",{message: aboutMessage} );
})
app.get("/contact",  (req, res)=>{
    res.render("./contact.ejs",{message: contactMessage} );
})

app.get("/compose",  (req, res)=>{
    res.render("./compose.ejs" );
})
app.post("/compose",  (req, res)=>{
    
    const post ={
        title: req.body.title,
        message: req.body.content
    };
    posts.push(post);
    res.redirect('/')
});

app.get("/posts/:postName", (req, res)=>{
    const reqTitle = _.lowerCase(req.params.postName);
    posts.forEach(post => {
        const storedTitle = _.lowerCase(post.title);
        if(storedTitle === reqTitle){
            res.render("post.ejs",{
                title: post.title,
                content: post.message
            });
        }
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    
})