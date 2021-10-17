const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

const multer = require('multer')
// 서버의 루트 폴더에 있는 upload 폴더를 사용자의 파일이 업로드가 되는 공간으로 설정
const upload = multer({dest: './upload'}) 

// 회원 정보 출력(SELECT)
app.get('/api/users', (req,res) => {
    connection.query(
      "SELECT * FROM USER WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
})

// 회원가입
// upload 폴더를 사용자가 접근해서 프로필이미지를 확인할 수 있도록 함
app.use('/image', express.static('./upload')) // image 폴더에서 해당 폴더에 접근할 수 있도록 함
app.post('/api/users', upload.single('image'), (req, res) => {
  let sql1 = "SELECT * FROM USER WHERE userid = ?";
  let sql2='INSERT INTO USER VALUES (null, ?, ?, ?, now(), 0, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birth = req.body.birth;
  let userid = req.body.userid;
  let userpw = req.body.userpw;
  let params = [image, name, birth, userid, userpw];

  connection.query(sql1, userid, (err, rows) => {
    if(rows.length>0){
      res.json({
        registerSuccess: false,
        message: "이미 존재하는 ID입니다."
      })
    } else{
      bcrypt.hash(params[4], saltRounds, (err, hash) => {
        params[4] = hash
        connection.query(sql2, params,
          (err, rows, fields) => { //성공적으로 데이터 입력되면 관련 메시지를 클라이언트에게 출력
            if(err) console.log(err)
            
            res.json({
              registerSuccess: true,
              message: "회원가입 성공!"
            });
          })
      })
    }
  })

})

// 회원 삭제 (isDeleted->1로 업데이트)
app.delete('/api/users/:id', (req, res) => {
  let sql = 'UPDATE USER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fileds) => {
      res.send(rows);
    }
  )
})

// 로그인
app.post('/api/users/login', (req, res) => {
  let userid = req.body.userid;
  let userpw = req.body.userpw;
  let sql = 'SELECT * FROM USER WHERE userid = ?';
  let params = [userid, userpw];

  connection.query(sql, params[0], (err, row) => {
    if(err) console.log(err)
    
    if(row.length>0){ //ID가 존재하면
      bcrypt.compare(params[1], row[0].userpw, (err, result) => {
        if(result){
          res.cookie("loginUser", userid).status(200).json({
            success: true,
            userid: userid
          })
          console.log("성공")
        } else {
          res.json({
            success: false,
            message: '비밀번호가 틀렸습니다.'
          })
          console.log("비밀번호 틀림")
        }
      })
    } else{
      res.json({
        success: false,
        message: '존재하지 않는 id입니다.'
      })
      console.log("id없음")
    }
  })
})

app.listen(port, () => console.log(`Listening on Port ${port}`));
