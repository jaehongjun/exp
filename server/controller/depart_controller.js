
var express = require('express');
var router = express.Router();
var mysql = require('promise-mysql');
var dbConfig = require('../conf/dbconfig.js');
var ds = require('../service/depart_service');
module.exports = router;
const con = mysql.createConnection(dbConfig);

router.get('/',selectDepartList);
router.post('/',insertDepart);
router.get('/:diNo',selectDepart )
router.delete('/:diNo',deleteDepart)
router.post('/update',updateDepart)

var errorHandle = (err)=>{

    console.log(err);
    var result = {};
    if(err.code){
        result["error"] = {"code" : err.code,
        "no" : err.errno,
        "msg" : err.sqlMessage
        }
    }else{
        result["error"] = "error"
    }
    return result;
}
var rowsHandle = (rows)=>{
    var result = {};
    result["list"] = rows;
    return result;
}


function selectDepart(req, res, next){
    ds.selectDepart(req)
    .then(rows=>{
        res.json(rows)
    })
}

function selectDepartList(req, res, next){
    
    ds.selectDepartList(req)
    .then(rows=>{
        res.json(rows)
    })
}
function deleteDepart (req, res, next){
    ds.deleteDepart(req)
    .then(rows=>{
        res.json(rows);
    })
    
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
    ds.insertDepart(req)
    .then(data=>{
        res.json(result)
    })

    
}

function updateDepart (req, res, next){
    ds.updateDepart(req)
    .then(data=>{
        res.json(result)
    })
    
}