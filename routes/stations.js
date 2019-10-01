const express = require('express');
const router = express.Router();
const Stations = require('../models/stations');
const Weathers = require('../models/weathers');
// const hour_06260702 = require('../models/weathers');

//查询站点表
router.get('/', (req, res, next) => {
    Stations.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: 1,
                msg: '查询站点失败',
                result: ''
            })
        } else {
            if (doc) {
                res.json({
                    status: 0,
                    msg: '查询站点成功',
                    result: doc
                });
                console.log(doc.length);
            }
        }
    })
});

//查询某个站点每小时的气温
router.get('/hourWea', (req, res, next) => {
    let stationsName = req.query.stationName;
    let month = req.query.month;
    let day = req.query.day;
    let params = {
        Station_name: stationsName
    };
    Stations.findOne(params, (err, doc) => {
        let station_id = doc.Station_Id_C;
        console.log(typeof station_id);
        let weaParam = {
            'Station_Id_C': station_id,
            'Mon': month,
            'Day': day
        };
        Weathers.find(weaParam).sort({'Hour': 1}).exec((weaErr, weaDoc) => {
            if (err) {
                res.json({
                    status: 1,
                    msg: '查询站点失败',
                    result: ''
                })
            } else {
                if (doc) {
                    res.json({
                        status: 0,
                        msg: '查询站点成功',
                        result: weaDoc
                    });
                    console.log(weaDoc.length);
                }
            }
        })
    })
});

//查询某个站点日平均气温
router.get('/dayWea', (req, res, next) => {
    let stationsName = req.query.stationName;
    let startMonth = parseInt(req.query.startMonth);
    let startDay = parseInt(req.query.startDay);
    let endMonth = parseInt(req.query.endMonth);
    let endDay = parseInt(req.query.endDay);
    console.log(stationsName, startMonth, startDay, endMonth, endDay);
    Stations.findOne({Station_name: stationsName}, (err, doc) => {
        let station_id = doc.Station_Id_C;
        console.log(station_id);
        Weathers.aggregate([
            {
                $match: {Station_Id_C: station_id, Day: {$gte: startDay, $lte: endDay}}
            },
            {
                $project: {
                    // Station_Id_C:1,
                    Day: 1,
                    TEM: 1,  //设置原有TEM字段可用，用于计算温度
                    PRE_1h: 1,
                    // Mon: 1
                },
            },
            {
                $group: {
                    _id: "$Day", //将_id设置为Station_Id_C数据
                    // month: '$Mon',
                    avgTemp: {$avg: "$TEM"}, //统计TEM
                    totalPre: {$sum: "$PRE_1h"}
                }
            }, {
                $sort: {_id: 1}
            }
        ]).exec(function (err, weaDoc) {//返回结果
            console.log(weaDoc);
            res.json({
                status: 0,
                msg: 'suc',
                result: weaDoc
            })
        });
    });
});
module.exports = router;
