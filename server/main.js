const express = require('express');
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const Headers = require("./conf/header")
app.set('port', (process.env.PORT || 3000));

//app.use('/', express.static(__dirname + '/../dist'));
app.use('/scripts', express.static(__dirname + '/../node_modules'));
// const dbConfig   = require('./conf/dbconfig.js');
// const mysql = require('mysql');
// const mysql2 = require('promise-mysql');
const menuController = require('./controller/menu_controller')
const departsController = require('./controller/depart_controller')
const userContorller = require('./controller/user_controller')
// var connection = mysql.createConnection(dbConfig);
// var connection2 = mysql2.createConnection;
// const con = mysql2.createConnection(dbConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev')); // morgan : log찍는거 



// RESTFUL get post put delete trace
app.use(Headers);

app.use('/api/menus/',menuController);
app.use('/api/departs',departsController)
app.use('/api/userdeparts' , userContorller);

app.listen(app.get('port'), function() {
    console.log('express running port : '+app.get('port'));
});


// // get 방식인것만 쓰겠다.
// app.get('/api/users',(req, res, next)=>{
//     var result = {};
//     var paramObj = JSON.parse(req.query.user);
//     console.log("param=" + paramObj);
//     var sql = 'SELECT userNo, userName, userId, userPwd from user_info where 1=1 '
//     sql += generateWhere(paramObj);
//     console.log(sql);
//     var values = generateWhereValue(paramObj);
//     console.log(values);
//     connection.query(sql, values, (err, rows)=>{
//         if(err) throw err;
//         console.log("rows=>" + rows);
//         result["list"] = rows;
//         res.json(result);
//         next();
//     });
// })
// app.get('/api/users',(req,res,next)=>{
//     console.log(req.query.user);
// });

// app.get('/api/users2',(req, res, next)=>{
//     var paramObj = JSON.parse(req.query.user);
//     var sql = 'SELECT userNo, userName, userId, userPwd from user_info where 1=1 '
//     sql += generateWhere(paramObj);
//     var values = generateWhereValue(paramObj);
//     connection2(dbConfig).then((conn)=>{
//         return conn.query(sql, values);
//     })
//     .then(rowsHandle)
//     .catch(errorHandle)
//     .then((result)=>{
//         console.log(result);
//         res.json(result);
//         next();
//     });
// });

// app.get('/api/userhis/:userNo',(req, res, next)=>{
//     var values = [req.params.userNo];
//     var sql = "select userNo, userData from user_his where userNo=?";
//     connection2(dbConfig).then((conn)=>{
//         return conn.query(sql, values);
//     })
//     .then(rowsHandle)
//     .catch(errorHandle)
//     .then((result)=>{
//         console.log(result);
//         res.json(result);
//     });
// })




// app.post('/api/users',(req,res,next)=>{
//     var sql = "select 1 from user_info where userId=?";
//     var values = [req.body.userId];
//     connection2(dbConfig)
//     .then((con)=>{
//         return con.query(sql,values);
//     })
//     .then((result)=>{
//         if(result.length>0){
//             throw {"code":"중복에러","errno":1,"sqlMessage":req.body.userId+"이거 있어! 에러야임마!!"};
//         }
//         return true;
//     }).then(()=>{
//         sql = "insert into user_info(";
//         sql += "userId, userName, userPwd)";
//         sql += "values(?,?,?,?)";
//         var pm = req.body;
//         var values = [pm.userId, pm.userName, pm.userPwd];
//         var result = {};
//         return connection2(dbConfig).then((con)=>{
//             return con.query(sql,values);
//         })
//     }).then((result)=>{
//         console.log(result);
//         if(result.affectedRows==1){
//             var sql = "select userNo, userName,userId,userPwd from user_info";
//             return connection2(dbConfig).then((conn)=>{
//                 return conn.query(sql);
//             })
//             .then(rowsHandle);
//         }else{
//             throw {"code":"몰름","errno":2,"sqlMessage":"이유는 모르겠고 안드갔는데?"};
//         }
//     })
//     .catch(errorHandle)
//     .then((result)=>{
//         console.log(result);
//         res.json(result);
//     });
   
// })
// app.post('/api/users',(req, res, next)=>{
//     var sql = "insert into user_info("
//     var valueSql = "values("
//     var values = [];
//     for(var key in req.body){
//         sql += key+",";
//         valueSql += "?,";
//         values.push(req.body[key]);
//     }
//     sql = sql.substr(0, sql.length-1) + ")";
//     valueSql = valueSql.substr(0, valueSql.length-1) + ")";
//     sql += valueSql;
//     connection2(dbConfig).then((conn)=>{
//         console.log(sql);
//         return conn.query(sql, values);
//     })
//     .then(rowsHandle)
//     .catch(errorHandle)
//     .then((result)=>{
//         console.log(result);
//     });
// })





// var generateWhere = function(paramObj){
//     var whereStr = '';
//     Object.keys(paramObj).forEach((key)=>{
//         whereStr += ' and ' + key + '=? ';
//     });
//     return whereStr;
// }

// var generateWhereValue = function(paramObj){
//     var whereValue = [];
//     Object.keys(paramObj).forEach((key)=>{
//         whereValue.push(paramObj[key]);
//     });
//     return whereValue;
// }
// var errorHandle = (err)=>{
//     console.log(err);
//     var result = {};
//     result["error"] = {"code" : err.code,
//     "no" : err.errno,
//     "msg" : err.sqlMessage
//     };
//     return result;
// }
// var rowsHandle = (rows)=>{
//     var result = {};
//     result["list"] = rows;
//     return result;
// }


// app.get('/api/depart',(req,res,next)=>{
//     // 겟으로는 body실행안됨
//     console.log(req.body.name);
//     console.log(req.body.diName);    
//     console.log(req.query.name);
//     console.log(req.query.diName);
//     var result = {};
//     result["succed"] = "ok"
//     var depart = {};
//     depart["diNo"] = 3;
//     depart["diName"] = "test"
//     depart["diDesc"] = "테스트반"
//     depart["diCnt"] = 2;
//     result["di"] = depart;
//     res.json(result);
    
// });