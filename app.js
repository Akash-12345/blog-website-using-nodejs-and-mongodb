const express=require('express')
const morgan=require('morgan')
const mongoose=require('mongoose');
const { result } = require('lodash');

const { render } = require('ejs');
const blogrouters=require('./routes/blogroutes')


const app=express();//instance of express

//connect to mongodb
const dbURI='mongodb+srv://akashanilk30:kalaanil@nodejstut.uwexive.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs');


app.use((req,res,next)=>{
   console.log('in the next middleware')
   next();
})
app.use(express.urlencoded({extended:true}))


//mongodb and mongoose routes 

app.get('/add-blog',(req,res)=>{
   const blog=Blog(
      {
         title:'new blog 3',
         snippet:'about new blog',
         body:'more about new blog'
      }
   )
   blog.save()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
      console.log(err)
   })
})
/*
app.get('/all-blog',(req,res)=>{
   Blog.find()
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
      console.log(err)
   })
})

app.get('/single-blog',(req,res)=>{
   Blog.findById('63d7711c730c38c36376c2bc')
   .then((result)=>{
      res.send(result)
   })
   .catch((err)=>{
      console.log(err)
   })
})

*/





//routes
app.get('/',(req,res)=>{
   // res.send('<p> Home page</p>')
   res.redirect('/blogs');
   /*
   const blogs=[
      {title:'akash needs money',snippet:'qrfdsgegdsadgsd'},
      {title:'akash needs money',snippet:'qrfdsgegdsadgsd'},

   ];
   res.render('index',{title:'Home',blogs});
   */
})

app.get('/about',(req,res)=>{
    // res.send('<p> Home page</p>')
    res.render('about',{title:'About'})
 })

 //404 page

 app.use((req,res)=>{
    res.status(404).render('404',{title:'404 error page not found'})
 })

