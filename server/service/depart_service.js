var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig')
const con = mysql.createConnection(dbConfig);
var errorHandle = require('../conf/errorhandle');
var rowsHandle = require('../conf/rowsHandle');

var departService = {
    selectDepartList:selectDepartList,
    insertDepart:insertDepart,
    selectDepart:selectDepart,
    deleteDepart:deleteDepart,
    updateDepart:updateDepart
}
module.exports = departService;


function selectDepartList(req){
    
    var sql = "select diNo,diName,diDesc,diCnt from Depart_info"
    
    return con.then((con)=>{
        return con.query(sql);
    }).then(rowsHandle)
    .catch(errorHandle);
}
function selectDepart(req, res, next){
    
    var sql = "select diNo,diName,diDesc,diCnt from Depart_info where diNo = ? ";    
    var diNo = [req.params.diNo];    
    console.log(sql);    
    return con.then((con)=>{
        return con.query(sql,diNo);
    }).then(rowsHandle)
    .catch(errorHandle);
}

function deleteDepart (req, res, next){
    
    var sql = "delete from Depart_info where diNo = ? ";    
    var diNo = [req.params.diNo];
    console.log(diNo);    
    console.log(sql);    
    var result = {};
    return con.then(con=>{
        return con.query(sql,diNo);
    }).then(rowsHandle)
    .catch(errorHandle);
    // 내가 한거
    // .then(rows=>{
    //     console.log(rows)
    //     result["succeed"]="OK";
    //     if(rows.affectedRows != 1){
    //         result["succeed"] = "no"
    //     }
    //     res.json(result);
    // })
}

function insertDepart(req, res, next){
    console.log(req.body);
    
    var sql = "insert into Depart_info(diName,didesc,dicnt)"
    sql += "values(?,?,?)"
    var obj = req.body;
    var values = [obj.diName,obj.diDesc,obj.diCnt]
    console.log(values);
    var result = {};
    con.then(con=>{
        dbCon = con;
        return con.query(sql,values);
    }).then(rows=>{
        console.log(rows)
        result["succeed"]="NO";
        if(rows.affectedRows==1){
            var diNo = rows.insertId;
            console.log(diNo)
            sql = "select ? as diNo, count(1) as diCnt from user_info where dino=?"
            return dbCon.query(sql,[diNo,diNo])            
        }
    }).then(rows=>{
        var diCnt, diNo;
        rows.map(row=>{
            diCnt = row.diCnt;
            diNo = row.diNo;
        })
        sql = "update depart_info set dicnt = ? where diNo = ?";
        return dbCon.query(sql,[diCnt, diNo]);
    }).then(rows=>{
        if(rows.affectedRows==1){
            result["succeed"] = "OK"
            result["rows"] = rows;
        }
    }).catch(err=>{
        console.log(err);
        result["succeed"] = "NO"
    }).then(rowsHandle)
    .catch(errorHandle);

    
}

function updateDepart (req, res, next){
    console.log(req.body);
    
    var sql = "update Depart_info"
    sql += " set diName = ?,";
    sql += " diDesc = ?,";
    sql += " diCnt = ?";
    sql += " where diNo = ?";
    var obj = req.body;
    var values = [obj.diName,obj.diDesc,obj.diCnt,obj.diNo]
    console.log(values);
    var result = {};
    con.then(con=>{
        return con.query(sql,values);
    }).then(rows=>{
        console.log(rows)
        result["succeed"]="OK";
        if(rows.affectedRows != 1){
            result["succeed"] = "no"
        }
        res.json(result);
    }).then(rowsHandle)
    .catch(errorHandle);
    
}