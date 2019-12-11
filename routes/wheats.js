// 查询小麦气象指标
const express = require('express');
const router = express.Router();
const Wheats = require('../models/wheats');



/* geojson插入数据库 */
router.get('/', function (req, res, next) {
    Wheats.find({}, (err, doc) => {
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
