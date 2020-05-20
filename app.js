//jshint esversion:6
require('dotenv').config();
const express=require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption")
const app = express();
console.log(process.env.API_KEY);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true});
const secretSchema={
  secret:String
};
const userSchema={
  email:String,
  password:String,
  secret:[secretSchema]
};
userSchema.plugin(encrypt, {secret:process.env.API_KEY, encryptedFields: ["password"] });
const User =mongoose.model("User",userSchema);

app.get("/",function(req,res){
  res.render("home");
})

app.get("/login",function(req,res){
  res.render("login");
})
app.get("/register",function(req,res){
  res.render("register");
})
app.get("/logout",function(req,res){
  res.render("home");
})
app.post("/register",function(req,res){
  var email=req.body.username;
  var password=req.body.password;
  const newUser=new User({
    email:email,
    password:password
  });
  newUser.save(function(err){
    if(err)
    console.log(err);
    else {
      res.render("Secrets");
    }
  });
})
app.post("/login",function(req,res){
  var email=req.body.username;
  var password=req.body.password;
  User.findOne({email:email },function(err,result){
    if(err)
    {
      console.log(err);
    }
    else {if(result)
        {  if(results.password===password)
               res.render("Secrets");}

    }
})
});
app.post("/submit",function(req,res){
    var secret=req.body.secret;
})

app.post("/logout",function(req,res){
  res.render("home");
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
