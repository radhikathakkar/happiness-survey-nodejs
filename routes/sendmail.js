var nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const sendMailRouter = express.Router();
sendMailRouter.use(bodyParser.json());
function sendData(mailOptions){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'thakkarradhika770@gmail.com',
          pass: 'India4321'
        },
        tls: { rejectUnauthorized: false }
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