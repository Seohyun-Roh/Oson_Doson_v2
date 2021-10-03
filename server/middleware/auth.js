const { User } = require("../models/User");

//인증 처리를 하는 곳
let auth = (req, res, next) => {
    //클라이언트 쿠키에서 토큰을 가져옴
    let token = req.cookies.x_auth;
    
    //토큰 복호화 -> 유저 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json( {isAuth: false, err: true});

        req.token = token;
        req.user = user;
        next();
    })
    //유저가 있으면 인증 OK, 없으면 NO

}

module.exports = {auth};