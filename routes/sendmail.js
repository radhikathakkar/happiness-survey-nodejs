var nodemailer = require('nodemailer');
const sendMailRouter = express.Router();
sendMailRouter.use(bodyParser.json());
const express = require('express');
const bodyParser = require('body-parser');
function sendData(mailOptions){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'thakkarradhika770@gmail.com',
          pass: 'India4321'
        }
      });
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


sendMailRouter.get('/senddddd', (req,res) => {
    var mailOptions = {
        from: 'thakkarradhika770@gmail.com',
        to: 'thakkarradhika1611@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      sendData(mailOptions)
})
module.exports = sendMailRouter;