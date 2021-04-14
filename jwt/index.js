const jwt = require("jsonwebtoken")
const secret = require("../config").secretOrPrivateKey;

const createJWTToken = (data, expiresIn) => {//创建token的方法
    let obj = {};
    obj.data = data || {};//存入token的数据
    obj.ctime = (new Date()).getTime();//token的创建时间
    obj.expiresIn = expiresIn || 1000 * 60 * 60 * 24 * 7//设定的过期时间
    let token = jwt.sign(obj, secret)
    return token;
}

const varifyJWTToken = (token) => {//验证token是否合法的方法
    let result = null;
    try {
        let { data, ctime, expiresIn } = jwt.verify(token, secret);
        let nowTime = (new Date()).getTime();
        if (nowTime - ctime < expiresIn) {
            result = data;
        }
    } catch (error) {
        console.log(error)
    }
    return result;
}

//验证token的方法
const tokenMiddlWare = (req, res, next) => {
    let { token } = req.body
    //验证用户有没有传token
    if (!token) { return res.send({ err: -997, msg: 'token丢失' }) }
    //获取验证token的状态
    let tokenState = varifyJWTToken(token)
    if (tokenState) {
        next()
    } else {
        res.send({ err: -998, msg: 'token失效' })
    }
}

module.exports = { createJWTToken, varifyJWTToken, tokenMiddlWare };
