const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../connection');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const smtp = require('smtp');
const sql = require('mssql');
const userrouter = express.Router();
userrouter.use(bodyParser.json());

// perform login authentication for RA
userrouter.get('/ra/:DomainId', (req, res, next) => {
    var domainId = req.params.DomainId;
    new sql.Request(conn)
        .input("param", sql.VarChar, domainId)
        .query("select * from [dbo].[vwEmployeeDetailsWithAARA] where AAEmailID = (select RishabhId from [dbo].[vwEmployeeDetailsWithAARA] where DomainId = @param)")
        .then((data) => {
            if (data == null || data.length == 0) {
                return res.status(500).send();
            }
            if (data.rowsAffected == 0 || data.rowsAffected == null) {
                return res.status(404).send();
            } else {
                new sql.Request(conn)
                    .input("param", sql.VarChar, domainId)
                    .query("select RishabhId from [dbo].[vwEmployeeDetailsWithAARA] where DomainId = @param")
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
        .query("SELECT * FROM [dbo].[vwEmployeeDetailsWithAARA] WHERE AAID COLLATE DATABASE_DEFAULT = (SELECT EmpCode COLLATE DATABASE_DEFAULT FROM dbo.vwEmployeeDetailsWithAARA WHERE DomainId=@param) ")
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

//To get user's data by their Rishabh Id
userrouter.post('/sqlData', (req, res) => {
    var rishabhId = req.body.rishabhId;
    new sql.Request(conn)
        .input("param", sql.VarChar, rishabhId)
        .query("SELECT * FROM [dbo].[vwEmployeeDetailsWithAARA] WHERE rishabhId=@param ")
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

userrouter.get('/send-email', (req, res) => {
    console.log('send email')
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        rateDelta: 3000,
        auth: {
            user: 'thakkarradhika770@gmail.com',
            pass: 'India4321'
        },
        tls: {
            rejectUnauthorized: false
        },
        secure: true
    });

    var mailOptions = {
        to: 'thakkarradhika1611@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log('send email transporter fun');
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.message);
        }
    })
});

module.exports = userrouter;



    