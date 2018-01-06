var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig.js');
module.exports = router;
const con = mysql.createConnection(dbConfig);
var errorHandle = require('../conf/errorhandle');
var rowsHandle = require('../conf/rowsHandle');
router.get('/',selectUserList);
router.get('/select',selectUser);
router.delete('/:userno',deleteUser);
router.post('/',updateUser);
router.get('/login',loginUser);

function loginUser(req,res,rext){
    var userId = req.query.userId;
    var userPwd = req.query.userPwd;
    var result = {};
    sql = "select userNo,userName,userId, userAge, userPwd,userAddress"
    sql += " from user_info where userId = ?"
    con.then((con)=>{
        return con.query(sql,userId);
    })
    .then(rows=>{
        result["login"] = "no"
        if(rows.length==1){
            var checkPwd = rows[0].userPwd;
            if(userPwd==checkPwd){
                result["login"] = "ok"
                result["list"] = rows
           }
        }
        return result;
    })
    .catch(errorHandle)
    .then(result=>{
        res.json(result);
    })
         
}



function selectUserList(req,res,next){
    var sql = "select * from user_info ui,depart_info di"
    sql += " where ui.dino = di.dino;"
    con.then((con)=>{
        return con.query(sql);
    }).then(rows=>{
        res.json(rows)
    })
}

function selectUser(req,res,next){
    var sql = "select * from depart_info"
    con.then((con)=>{
        return con.query(sql);
    }).then(rows=>{
        res.json(rows)
    })
}
function deleteUser(req,res,next){
    var sql = "select dino from user_info";
    sql += " where userno = ?"
    var userno = req.params.userno;
    result = {};
    con.then((con)=>{
        return con.query(sql,userno);
    }).then(
        rows=>{
            console.log(rows);
            var sql = "delete from user_info"
            sql += " where userno = ?"
            var userno = req.params.userno;
            result = {};
    })
    .catch(errorHandle)
    .then(rows=>{
        if(rows.affectedRows == 1){
            result["succeed"]="OK";            
        }else{
            result["succeed"] = "no"
        }
        res.json(result)
    }).then(
        rows=>{

        }
    )
}
function updateUser(req,res,next){

    var sql = "update user_info"
    sql += " set username = ?,";
    sql += " userid = ?,";
    sql += " dino = ?";
    sql += " where userno = ?";
    var obj = req.body;
    var values = [obj.username,obj.userid,obj.dino,obj.userno]
    console.log(values);
    var result = {};
    con.then(con=>{
        return con.query(sql,values);
    }).catch(errorHandle)
    .then(rows=>{
        console.log(rows)
        result["succeed"]="OK";
        if(rows.affectedRows != 1){
            result["succeed"] = "no"
        }
        res.json(result);
    }).then(
        rows =>{
            if(result.succeed=='OK'){
                result["succeed"] = "no"
                var sql = "update depart_info"
                sql += " set dicnt = dicnt-1";
                sql += " where dino = ?";
                var values = [obj.dino]
                con.then(con=>{
                    return con.query(sql,values);
                }).catch(errorHandle)
                .then(rows=>{
                    if(rows.affectedRows == 1){
                        result["succeed"] = "OK"
                    }
                })

            };
        }
    )
}