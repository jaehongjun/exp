const exp = require("express"); //request, respone, next
const app = exp();
const mysql = require("mysql");
let dbconf = {
    host : 'localhost',
    user : 'root',
    password : '1234',
    port : '3306',
    database : 'ang2'
}
let connection = mysql.createConnection(dbconf);
app.use('/',(req,res,next)=>{
    console.log(req.url)
    if(req.url.indexOf(".html")!=-1){
        res.sendFile(req.url,{root:__dirname+"/views"})
    }else{
        res.writeHead(200,{'content-Type' : 'text/html;charset=utf-8'})
        next();
    }
})
// send 자동으로 인코딩. 한번 보내면 끝
// write 계속 보낼 수 있음.
app.get('/',(req,res,next) => {
    
    res.write("요청경로: " + req.url)
    res.write("<br/>first Start")
    res.write("<br/>first End")
    next();
});
app.get('/',(req,res,next) => {
    res.write("<br/>second ");
    res.end();
})
app.get('/test',(req,res,next) => {
    
    res.write("요청경로: " + req.url)
    res.end();
})

app.get('/join2',(req,res,next)=>{
    let username = req.query.username;
    let userage = req.query.userage;
    let userid = req.query.userid;
    let userpwd = req.query.userpwd;
    let useraddress = req.query.useraddress;

    ;
    if(username.trim()==""){
        res.write("<script>alert('이름없습니다.');location.href='/join';</script>")
    }
    if(userage.trim() ==""){
        res.write("<script>alert('나이없습니다.');location.href='/join';</script>")        
    }
    let sql =  "select count(1) from user_info where userid=?";
    let values = [userid];
    connection.query(sql,values,(err,rows) =>{
        if(err) throw err;
        console.log(rows.length);
        if(rows.length==0){
            sql = "insert into user_info (username,userage,userid,userpwd,useraddress,dino)";
            sql += "values(?,?,?,?,?,1)";
            values = [username,userage,userid,userpwd,useraddress];
            connection.query(sql,values,(err,rows) => {
                if(err){
                    console.log(err);
                    res.write('회원가입 실패!');
                    res.end();  
                }else if(rows){
                    if(rows.affectedRows==1){
                        res.write('회원가입완료!')
                        res.end();  
                    }
                }
            })
        }else{
            res.write('입력하신 아이디 : '+userid+'가 이미 존재합니다.');
            res.end(); 
        }
    })
    
    
})
app.get('/list',(req,res,next)=>{
    let sql = "select * from user_info";
    let values = []; // 배열
    let result = {}; // 구조체 json가능
    connection.query(sql,values,(err,rows)=>{
        if(err) throw err;      
        result["list"] = rows;
        res.json(result);
    })
})
app.listen(3000,function(){
    console.log("sever Start");
});

//restAPI 인자값들로 로직변경