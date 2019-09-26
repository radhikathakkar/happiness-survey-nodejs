require('custom-env').env();
var mongoose = require('mongoose');
var url = process.env.MONGO_URL;
var sql = require('mssql');

var config = {
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE
};

mongoose.connect(url,(err,res) => {
    if(err){
        console.log(err);
    }else{
        console.log('Database Connected Successfully..');
    }
});

var conn = sql.connect(config, (err) => {
    if(!err){
        console.log('connected')
    }
})

module.exports = conn;