const express = require("express");
const path = require("path");
const app = express();
const LogInCollection = require("./mongodb");

app.use(express.urlencoded( { extended: true } )); // parse incoming
app.use(express.static("public"));
app.use(express.static("views"));
app.set("view engine ","ejs");
app.get('/',(req,res)=>{
    res.render("login.ejs");
});

app.get('/signup',(req,res)=>{
  res.render("signup.ejs");
});

app.get('/index',(req,res)=>{
    res.render("index.ejs");
});

app.get('/todolist',(req,res)=>{
  res.render("todolist.ejs");
});

app.post('/signup', async (req, res) => {
    try {
      const existingUser = await LogInCollection.findOne({ name: req.body.name });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }
  
      const newUser = new LogInCollection({
        name: req.body.name,
        password: req.body.password,
      });
  
      await newUser.save();
      res.redirect("/index");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const check = await LogInCollection.findOne({ name: req.body.name });
      if (check && check.password === req.body.password) {
        // Redirect to /index after successful login
        return res.redirect("/index");
      } else {
        res.status(401).json({ error: "Incorrect password" });
      }
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  



// app.get('/notes',(req,res)=>{
//     res.render("webcardstr1.ejs");
// });


// app.get('/lobby',(req,res)=>{
//     res.render("lobby.ejs");
// })

// // app.get("/login", (req, res) => {
// //     fs.readFile("index.html", 'utf-8', (err, data)=>{
// //         if(err){
// //             console.log(err);
// //         }else{
// //             res.send(data);
// //         }
// //     })
// // })


// // app.get("/profile", (req, res) => {
// //     if(authenticated == true){
// //         res.send('Welcome user123!');
// //     }else{
// //         res.redirect('/login');
// //     }
// // })



// // app.get("/checkout", (req, res) => {
// //     if(authenticated == true){
// //         res.send('Proceed with checkout!');
// //     }else{
// //         res.redirect('/login');
// //     }
// // })



// app.get('/notes', (req, res) => {
//     res.render('webcardstr1.ejs');
// });

// app.get('/about', (req, res)=>{
//     res.render('myindex.ejs');
// });

// app.listen(3000, () => {
//     console.log("Server running on port 3000.");
// })

app.get('/notes', (req, res) => {
    res.render("webcardstr1.ejs");
  });
  
  app.get('/lobby', (req, res) => {
    res.render("lobby.ejs");
  });
  
  app.get('/about', (req, res) => {
    res.render('myindex.ejs');
  });
  
  app.listen(3000, () => {
    console.log("Server running on port 3000.");
  });








  