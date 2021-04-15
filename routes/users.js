var express = require('express');
var router = express.Router();

const User = require('../db/models/user')
const { createJWTToken, tokenMiddlWare } = require("../jwt")

const bcrypt = require('bcrypt'); // hash 密码加密 
const saltRounds = 10; // 加密模式

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

// $route POST /users/registered
// @desc 注册接口，返回JSON
// @access private
router.post('/registered', function (req, res) {
  const { name, email, password, age } = req.body
  if (!email) res.status(400).json({ msg: '邮箱为必填字段' })
  // 数据库数据查询
  User.findOne({ email })
    .then((users) => {
      if (users) {
        res.status(400).json({ msg: '邮箱已被注册' })
      } else {
        // 实例化数据
        const user = new User({
          name,
          password,
          email,
          age,
        })

        // 哈唏密码  加密密码
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(user.password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash
            // 数据库增加
            user.save()
              .then(val => {
                res.status(200).json({ msg: '帐号注册成功' })
              })
              .catch(err => {
                res.status(400).json({ msg: err.message })
              })
          });
        });
      }
    })
    .catch(err => {
      res.status(400).json({ msg: err.message, test: JSON.stringify(require('os').networkInterfaces()) })
      console.log('err', JSON.stringify(err, null, 4))
    })
});

// $route POST /users/login
// @desc 登录接口，返回JSON
// @access public
router.post('/login', function (req, res) {
  const { name, email, password } = req.body
  if ((!email || !name) && !password) res.status(400).json({ msg: '账号或密码未填写' })
  // 数据库数据查询
  let data = new Object()
  if (email) data.email = email
  if (name) data.name = name
  User.findOne(data)
    .then((users) => {
      if (users) {
        // 加密 密码比对
        bcrypt.compare(password, users.password, function (err, result) {
          // result == true
          if (result) {
            let a = createJWTToken(req.body)
            console.log(a)
            res.status(200).json({ msg: '登录成功', data: users, token: a })
          } else {
            res.status(400).json({ msg: '密码输入不正确' })
          }
        });
      } else {
        res.status(400).json({ msg: '账号不存在' })
      }

    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ msg: '账号不存在' })
    })
});

// $route POST /users/updated
// @desc 修改接口，返回JSON
// @access private
router.post('/updated', tokenMiddlWare, function (req, res) {
  console.log(req.headers)
  const { name, email, password, age } = req.body
  if (!email) res.status(400).json({ msg: '邮箱为必填字段' })
  // 数据库数据查询
  User.updateOne({ email }, req.body)
    .then((val) => {
      console.log(val,'val')
      // val // 结果说明
      // n: 'Number of documents matched', 
      // nModified: 'Number of documents modified',
      // ok: ''
      if (val.n > 0 && val.nModified > 0) {
        User.findOne({ email }, { password: 0 })
          .then((users) => {
            if (users) res.status(200).json({ msg: '信息修改成功', data: users })
          })
          .catch(err => {
            res.status(400).json({ msg: '未找到数据' })
          })
      } else {
        res.status(200).json({ msg: '数据已是最新的' })
      }
    })
    .catch(err => {
      res.status(400).json({ msg: '未找到数据' })
    })
});

// $route POST /users/deleted
// @desc 删除接口，返回JSON
// @access private
router.post('/deleted', function (req, res) {
  const { name, email, password, age } = req.body
  if (!email) res.status(400).json({ msg: '邮箱为必填字段' })
  // 数据库数据删除
  User.findOneAndRemove({ email })
    .then((users) => {
      if (!!users) res.status(200).json({ msg: '账号删除成功' })
    })
    .catch(err => {
      console.log('err', JSON.stringify(err, null, 4))
    })
});

module.exports = router;
