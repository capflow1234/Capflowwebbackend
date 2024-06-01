const express = require('express')
const { default: mongoose } = require("mongoose");
require('dotenv').config()
const port = process.env.PORT || 5000
const nodemailer = require("nodemailer");
const cors = require("cors");
const { Enquiry } = require('./Models/EnquirySchema');
const Blog = require('./Models/BlogSchema');
const CaseStudy = require('./Models/CaseStudySchema');
const SmeKnowledge = require('./Models/SmeKnowledgeSchema');


 const app = express()



 const dbUrl = process.env.DB_CONNECTION_STRING;
 const EMAILPASS = process.env.EMAILPASS;

 const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'websitecapflow@gmail.com',
     pass: EMAILPASS
   },
 });


 app.use(cors())
 app.use(express.json());
 mongoose.connect(dbUrl)

 


app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.post('/email' , async (req , res)=>{
   const  email = req?.body?.email;
   const  name = req?.body?.name;
   const  phoneno = req?.body?.phoneno;
   const  msg = req?.body?.msg;
   console.log(req?.body)

   var htmlContent = `<!DOCTYPE html>
   <html>
   <head>
     <style>
       body {
         font-family: Arial, sans-serif;
         background-color: #f2f2f2;
         padding: 20px;
       }
       .container {
         background-color: #ffffff;
         padding: 20px;
         border-radius: 8px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }
       h1 {
         color: #007acc;
       }
       p {
         color: #444;
       }
       .cta-button {
         background-color: #007acc;
         color: #ffffff;
         text-decoration: none;
         padding: 10px 20px;
         border-radius: 4px;
         display: inline-block;
       }
       .cta-button:hover {
         background-color: #005fa9;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <h1>Hello from Capflow Website</h1>
       <p>
         <br>
         There has been an enquiry 
         <br>
         email: ${email}
         <br>
         name: ${name}
         <br>
         phone:  ${phoneno}
         <br>
         message:  ${msg}

       </p>
       <p>
        
       </p>
       <a href="" class="cta-button">Open App</a>
     </div>
   </body>
   </html>
   `;
   
   var mailOptions = {
     from: 'websitecapflow@gmail.com',
     to: 'leads@capflow.in',
     subject: 'Inquiry from Capflow Website!',
     // text: 'Hello your status for schalrship has been updated  Successfully.Now u can apply and avail the benefits of Scholarships',
     html: htmlContent
   };
  
try{

   const enquiry = await Enquiry.create({
      email: req.body.email,
      name:req?.body.name,
      phoneno:req.body.phoneno,
      msg:req.body.msg
  })
   transporter.sendMail(mailOptions, (error, info) => {


      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    res.send({
      "message":"success",
    })
   }
   catch(e)
   {
      res.send(
         {
            "message":"failure",
         }
      )
   }

})

app.get('/allblogs' ,async (req , res)=>{

  try{
    const blogs = await  Blog.find({})
    res.json({
      "status":true,
      "data":blogs
    })
  }
  catch(e)
  {
    console.log("Error occured")
    res.json
    ({
      "status":false
    })
  }



})



app.post('/blogs', async (req, res) => {
  try {
    // Generate slug from title

    const newblog = new Blog({
      ...req.body,

    });
    const savedblog = await newblog.save();
    res.status(201).json(savedblog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.post('/casestudies', async (req, res) => {
  try {
    // Generate slug from title

    const data = new CaseStudy({
      ...req.body,

    });
    const savedcasestudy = await data.save();
    res.status(201).json(savedcasestudy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/allcasestudies' , async (req , res)=>{
  try{
    const cases = await  CaseStudy.find({})
    res.json({
      "status":true,
      "data":cases
    })
  }
  catch(e)
  {
    console.log("Error occured")
    res.json
    ({
      "status":false
    })
  }



})

app.post('/smes', async (req, res) => {
  try {
    // Generate slug from title

    const data = new SmeKnowledge({
      ...req.body,

    });
    const savedsme = await data.save();
    res.status(201).json(savedsme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/allsmes' , async (req , res)=>{
  try{
    const sme = await  SmeKnowledge.find({})
    res.json({
      "status":true,
      "data":sme
    })
  }
  catch(e)
  {
    console.log("Error occured")
    res.json
    ({
      "status":false
    })
  }



})






app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))