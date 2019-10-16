const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../connection');
const sql = require('mssql');
const nodemailer = require('nodemailer');
const sendmail = require('sendmail')();
const userrouter = express.Router();
require('dotenv').config();
userrouter.use(bodyParser.json());

// perform login authentication for RA
userrouter.get('/ra/:DomainId', (req, res, next) => {
    var domainId = req.params.DomainId;
    new sql.Request(conn)
        .input("param", sql.VarChar, domainId)
        .query("select * from dbo.vwEmployeeDetailsWithAARA where AAEmailID = (select RishabhId from dbo.vwEmployeeDetailsWithAARA where DomainId = @param)")
        .then((data) => {
            if (data == null || data.length == 0) {
                return res.status(500).send();
            }
            if (data.rowsAffected == 0 || data.rowsAffected == null) {
                return res.status(404).send();
            } else {
                new sql.Request(conn)
                    .input("param", sql.VarChar, domainId)
                    .query("select RishabhId from dbo.vwEmployeeDetailsWithAARA where DomainId = @param")
                    .then((data) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(data.recordset[0].RishabhId);
                    }).catch((error) => {
                        return error;
                    });
            }
        }).catch(function (error) {
            return error;
        });
});


//To get user's belongs to RA
userrouter.get('/user/:DomainId', (req, res) => {
    var name = req.params.DomainId;
    new sql.Request(conn)
        .input("param", sql.VarChar, name)
        .query("SELECT * FROM dbo.vwEmployeeDetailsWithAARA WHERE AAID COLLATE DATABASE_DEFAULT = (SELECT EmpCode COLLATE DATABASE_DEFAULT FROM dbo.vwEmployeeDetailsWithAARA WHERE DomainId=@param) ")
        .then((data) => {
            if (data == null || data.length === 0) {
                return res.status(500).send();
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(function (error) {
            return error;
        });
});
userrouter.post('/send', (req, res) => {

    const toSendId = req.body.userId;

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({

        host: "172.16.7.88", // hostname
		secureConnection: false,
        port: 25,
        requireTLS: true,
		tls: {
                 rejectUnauthorized: false,
                 ciphers: 'SSLv3',
        },
        auth: {
            user: 'parth.soni@rishabhsoft.com', //rishabh username
            pass: 'prince12345@' // rishbh password
        },

    });
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'parth.soni@rishabhsoft.com', // sender address
        to:  'radhika.thakkar@rishabhsoft.com', // list of receivers
        subject: 'Survey Reminder', // Subject line
        text: 'This Is Reminder To Fill Your Survey Before Due Date ', // plaintext body
        // html: '<b>Hello world ?</b>' // html body
    };
    // send mail with defined transport object
    setTimeout(function () {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.send(info.response) 
        transport.close();
    });
},1000)
});

userrouter.post('/sendOnSubmit', (req, res) => {
    const toSendId = req.body.userId;
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: "172.16.7.88", // hostname
		secureConnection: false,
        port: 25,
        requireTLS: true,
		tls: {
                 rejectUnauthorized: false,
                 ciphers: 'SSLv3',
        },
        auth: {
            user: 'parth.soni@rishabhsoft.com', //rishabh username
            pass: 'prince12345@' // rishbh password
        },

    });
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'parth.soni@rishabhsoft.com', // sender address
        to:  toSendId, // list of receivers
        subject: 'Survey Feedback', // Subject line
        text: 'Thank You For Fill The Survey ', // plaintext body
        html: {path:'public/template.html'} // html body
    };
    // send mail with defined transport object
    setTimeout(function () {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        res.send(info.response)
        transport.close();
    });
},1000)
});


//To get user's data by their Rishabh Id
userrouter.post('/sqlData', (req, res) => {
    var rishabhId = req.body.rishabhId;
    new sql.Request(conn)
        .input("param", sql.VarChar, rishabhId)
        .query("SELECT * FROM dbo.vwEmployeeDetailsWithAARA WHERE rishabhId=@param ")
        .then((data) => {
            if (data == null || data.length === 0) {
                return res.status(500).send();
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data.recordset);
        }).catch(function (error) {
            return error;
        });
});

module.exports = userrouter;