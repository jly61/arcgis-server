// 气象灾害指标
const express = require('express');
const router = express.Router();
const Disasters = require('../models/disasters');

router.get('/', function (req, res) {
    const param = {
        disaster_type: req.query.name
    };
    Disasters.findOne(param, (err, doc) => {
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
    const disasterInfo = req.body;
    const disasterName = req.body.disaster_type;
    delete disasterInfo.name;
    console.log(disasterInfo)
    Disasters.updateOne({'disaster_type': disasterName}, {'$push': {norm: disasterInfo} }, (err, doc) => {
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
