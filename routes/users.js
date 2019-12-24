// 用户相关
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/users');


/* 用户登录 */
router.post('/login', function (req, res) {
    let username = req.body.username;
    let pwd = req.body.pwd;
    console.log(username, pwd);
    Users.findOne({name: username, password: pwd}, (usrErr, usrDoc) => {
        if (usrErr) {
            throw usrErr;
        } else {
            console.log(usrDoc);
            if (usrDoc.length !== 0) {
                //生成token的主题信息
                let content = {
                    name: username,
                };
                // 加密的key
                let secretOrPrivateKey = "jwt";
                let token = jwt.sign(content, secretOrPrivateKey, {
                    expiresIn: 60 * 60 // 1小时过期
                });
                console.log(token);
                res.json({
                    status: '0',
                    msg: '登陆成功',
                    result: {
                        name: usrDoc.name,
                        role: usrDoc.role,
                        token: token
                    }
                })
            } else {
                res.json({
                    status: '1',
                    msg: '登陆失败',
                    result: ''
                })
            }
        }
    })
});

router.get('/', function (req, res) {
    Users.find({}, {password: 0}, (err, doc) => {
        if (err) {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        } else {
            if (doc) {
                res.json({
                    status: 0,
                    msg: '请求成功',
                    result: doc
                });
            }
        }
    })
});

router.post('/add', function (req, res) {
    const userInfo = new Users(req.body);
    userInfo.save((err, doc) => {
        if (err) {
            throw err
        } else {
            if (doc) {
                Users.find({}, {password: 0}, (err, doc) => {
                    res.json({
                        status: 0,
                        msg: '插入成功',
                        result: doc
                    });
                })
            }
        }
    })
});

router.post('/delete', function (req, res) {
    const username = req.body.username;
    Users.remove({name: username}, (err, doc) => {
        if (err) {
            throw err
        } else {
            if (doc) {
                Users.find({}, {password: 0}, (err, doc) => {
                    res.json({
                        status: 0,
                        msg: '删除成功',
                        result: doc
                    });
                })
            }
        }
    })
});

router.post('/update', function (req, res) {
    const updateInfo = req.body;
    const username = updateInfo.name;
    Users.updateOne({name: username}, updateInfo , (err, doc) => {
        if (err) {
            throw err
        } else {
            if (doc) {
                console.log(doc)
                Users.find({}, {password: 0}, (err, doc) => {
                    res.json({
                        status: 0,
                        msg: '修改成功',
                        result: doc
                    });
                })
            }
        }
    })
});

module.exports = router;
