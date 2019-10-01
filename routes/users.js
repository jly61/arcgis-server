// 用户相关
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/users');


/* 用户登录 */
router.post('/login', function (req, res, next) {
    let username = req.body.username;
    let pwd = req.body.pwd;
    console.log(username,pwd);
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
                let secretOrPrivateKey="jwt";
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
module.exports = router;
