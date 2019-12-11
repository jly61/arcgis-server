// 查询水稻气象指标
const express = require('express');
const router = express.Router();
const Rices = require('../models/rices');


router.get('/', function (req, res, next) {
    Rices.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
        } else {
            if(doc) {
                res.json({
                    status: 0,
                    msg: '请求成功',
                    result: doc
                });
            }
        }
    })
});
module.exports = router;
