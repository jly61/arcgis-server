// 农业气象服务气象指标
const express = require('express');
const router = express.Router();
const Crops = require('../models/crops');

router.get('/', function (req, res) {
    const param = {
        name: req.query.name
    };
    Crops.findOne(param, (err, doc) => {
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

router.post('/add', function (req, res) {
    const cropInfo = req.body;
    const cropName = req.body.name;
    delete cropInfo.name;
    Crops.update({'name': cropName}, {'$push': {norm: cropInfo} }, (err, doc) => {
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
            console.log(doc)
        }
    })
});
module.exports = router;
