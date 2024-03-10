const express = require('express')
const { default: mongoose } = require("mongoose");
require('dotenv').config()
const port = process.env.PORT || 5000
const nodemailer = require("nodemailer");
const cors = require("cors");
const { Enquiry } = require('./Models/EnquirySchema');

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
     to: 'gurmeetsinghc2003@gmail.com',
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




app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))