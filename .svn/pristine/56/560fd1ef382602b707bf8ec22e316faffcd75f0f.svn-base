var mongoose = require('mongoose');
var url ="mongodb://172.16.7.101:27017/happiness-survey";
var sql = require('mssql');

var config = {
    user: "rspl_hr",
    password: "rspl123#",
    server: "RSDS004\\SS2008",
    database: "RSPLPortal_QA_new"
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