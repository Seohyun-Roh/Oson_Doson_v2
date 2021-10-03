const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//salt를 이용해서 비밀번호 암호화 하기 위해 salt 생성
//saltRounds 는 salt가 몇글자인지를 의미
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //space 없애주는 역할
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //사용자의 등급
        type: Number,
        default: 0
    },
    image: String,
    token: { //유효성 관리
        type: String
    },
    tokenExp:{ //토큰 유효기간
        type: Number
    }
})

//mongoose method: user 정보를 저장하기 전에 function을 실행
//next 하면 바로 index.js의 user.save ~ 코드로 넘어감
userSchema.pre('save', function(next){
    var user = this; //유저스키마를 가리킴

    //if안하면 변경해서 저장할 때 마다 비밀번호 변경됨(ex: 이메일을 바꿨는데도 비밀번호도 같이 바뀔 수 있음)
    if(user.isModified('password')){
        
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if(err) return next(err);

            //myPlanetextPassword(user.password): 넘어온 비밀번호(암호화되지 않은 순수한 비밀번호)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);

                user.password = hash; //plane password를 hash된 비밀번호로 바꿔줌
                next();
            });
        });
    } else{
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //이미 암호화된 비밀번호를 복구할 수는 없기 때문에
    //plainPassword를 암호화해서 둘이 같은지 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    //jsonwebtoken을 이용, token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    //user._id + 'secretToken' 형태로 토큰 생성
    //'secretToken'을 넣으면 user._id가 나옴
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    });
}

userSchema.statics.findByToken = function (token, cb){
    var user = this;

    //token = user._id+''
    //토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디 이용 -> 유저 찾고
        //클라이언트에서 가져온 token과 DB에 보관된 토큰 비교

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

//모델을 다른 파일에서도 쓰기 위함
module.exports = { User };