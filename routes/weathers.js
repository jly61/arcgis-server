const express = require('express');
const router = express.Router();
const Weathers = require('../models/weathers');
const Dbs = require('../models/rices');


// 查询每小时气温
router.get('/', function (req, res, next) {
    let hour = req.query.hour;
    let month = req.query.month;
    let day = req.query.day;
    // if (hour === undefined) {
    //     hour = '0';
    // } else {
    //     hour = req.query.hour;
    // }
    let params = {
        'Year': 2019,
        'Mon': month,
        'Day': day,
        'Hour': hour,
    };
    console.log(params);
    Weathers.find(params, (err, doc) => {
        if (err) {
            res.json({
                status: 1,
                msg: '请求失败',
                result: ''
            })
        } else {
            if (doc) {
                res.json({
                    status: 0,
                    msg: '请求成功',
                    result: doc, hour
                });
                console.log(doc.length);
            }
        }
    })
});

//查询日平均气温
router.get('/dayTemp', function (req, res, next) {
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);

    Dbs.aggregate([
        {
            $lookup: {
                from: 'hour_06260702',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        {
            $unwind: "$docs"
        },
        {
            $match: {'docs.Year': 2019 , 'docs.Mon': month, 'docs.Day': day}
        },
        {
            $project: {
                'Station_Id_C': 1,
                'name': 1,
                'coordinates': 1,
                'docs.TEM': 1,
                // PRE_1h: 1,
            },
        },
        {
            $group: {
                _id: "$name", //分组依据
                Station_Id_C: {$first: "$Station_Id_C"},
                coordinates: {$first: "$coordinates"},
                avgTemp: {$avg: "$docs.TEM"}, //统计TEM
                // totalPre: {$sum: "$PRE_1h"}
            }
        },
        {
            $sort: {_id: 1}//根据_id排序
        }
    ]).exec(function (err, doc) {//返回结果
        console.log(doc.length);
        res.json({
            status: 0,
            msg: 'suc',
            result: doc
        })
    });
});

//查询日总降雨量
router.get('/dayRain', function (req, res, next) {
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);

    Dbs.aggregate([
        {
            $lookup: {
                from: 'hour_06260702',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        {
            $unwind: "$docs"
        },
        {
            $match: {'docs.Year': 2019 , 'docs.Mon': month, 'docs.Day': day}
        },
        {
            $project: {
                'Station_Id_C': 1,
                'name': 1,
                'coordinates': 1,
                // 'docs.TEM': 1,
                'docs.PRE_1h': 1,
            },
        },
        {
            $group: {
                _id: "$name", //分组依据
                Station_Id_C: {$first: "$Station_Id_C"},
                coordinates: {$first: "$coordinates"},
                // avgTemp: {$avg: "$docs.TEM"}, //统计TEM
                totalPre: {$sum: "$docs.PRE_1h"}
            }
        },
        {
            $sort: {_id: 1}//根据_id排序
        }
    ]).exec(function (err, doc) {//返回结果
        console.log(doc.length);
        res.json({
            status: 0,
            msg: 'suc',
            result: doc
        })
    });
});


//kriging插值多表查询日平均气温，日总降雨量
router.get('/kri-hour', (req, res, next) => {
    let year = 2019;
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);
    let hour = parseInt(req.query.hour);
    console.log(month, day, hour)
    Weathers.aggregate([
        {
            $match: {Year: year, Mon: month, Day: day, Hour: hour}
        },
        {
            $lookup: {
                from: 'station_info',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        //多表多条件
        // {
        //     $match: {'docs.Station_Id_C': '56038'}
        // },
        {
            $project: {
                'Station_Id_C': 1,
                'TEM': 1,
                'PRE_1h': 1,
                'RHU': 1,
                'PRS': 1,
                'docs': 1,
                '_id': 0
            }
        },
        {
            $sort: {TEM: -1}//根据TEM排序
        }
    ], (err, doc) => {
        res.json({
            result: doc
        })
        console.log(doc);
    })
});

router.get('/kri-day', (req, res, next) => {
    let year = 2019;
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);
    Weathers.aggregate([
        {
            $match: {Year: year, Mon: month, Day: day}
        },
        {
            $lookup: {
                from: 'station_info',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        //多表多条件
        // {
        //     $match: {'docs.Station_Id_C': '56038'}
        // },
        {
            $project: {
                'Station_Id_C': 1,
                'TEM': 1,
                'PRE_1h': 1,
                'RHU': 1,
                'PRS': 1,
                'docs': 1,
                '_id': 0
            }
        },
        {
            $group: {
                _id: "$Station_Id_C", //分组依据
                avgTemp: {$avg: "$TEM" },
                sumPre: {$sum: "$PRE_1h" },
                RHU: { $first: "$RHU" },
                PRS: { $first: "$PRS" },
                other: { $first: "$docs" }
            }
        }
    ], (err, doc) => {
        res.json({
            result: doc
        })
        console.log(doc);
    })
});

//geojson与weather表联合查询每小时温度
router.get('/hourTemp', (req, res, next) => {
    let year = 2019;
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);
    let hour = parseInt(req.query.hour);
    Dbs.aggregate([
        // {
        //     $match: {Station_Id_C: '56172'}
        // },
        {
            $lookup: {
                from: 'hour_06260702',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        {
            $unwind: "$docs"
        },
        //多表多条件
        {
            $match: {'docs.Year': year, 'docs.Mon': month, 'docs.Day': day, 'docs.Hour': hour,}
        },
        {
            $project: {
                'name': 1,
                'Station_Id_C': 1,
                'coordinates': 1,
                'docs.TEM': 1,
                '_id': 0
            }
        }
    ], (err, doc) => {
        console.log(doc.length);
        res.json({
            result: doc
        })
    })
});

//geojson与weather表联合查询每小时降水
router.get('/hourPre', (req, res, next) => {
    let year = 2019;
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);
    let hour = parseInt(req.query.hour);
    Dbs.aggregate([
        // {
        //     $match: {Station_Id_C: '56172'}
        // },
        {
            $lookup: {
                from: 'hour_06260702',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        {
            $unwind: "$docs"
        },
        //多表多条件
        {
            $match: {'docs.Year': year, 'docs.Mon': month, 'docs.Day': day, 'docs.Hour': hour,}
        },
        {
            $project: {
                'name': 1,
                'Station_Id_C': 1,
                'coordinates': 1,
                'docs.PRE_1h': 1,
                '_id': 0
            }
        },
    ], (err, doc) => {
        console.log(doc.length);
        res.json({
            result: doc
        })
    })
});

// geojson与weather表联合查询日平均气温
router.get('/kri-day', (req, res, next) => {
    let year = 2019;
    let month = parseInt(req.query.month);
    let day = parseInt(req.query.day);
    Dbs.aggregate([
        // {
        //     $match: {Station_Id_C: '56172'}
        // },
        {
            $lookup: {
                from: 'hour_06260702',
                localField: 'Station_Id_C',
                foreignField: 'Station_Id_C',
                as: 'docs'
            }
        },
        {
            $unwind: "$docs"
        },
        //多表多条件
        {
            $match: {'docs.Year': year, 'docs.Mon': month, 'docs.Day': day}
        },
        {
            $project: {
                'name': 1,
                'Station_Id_C': 1,
                'coordinates': 1,
                'docs.TEM': 1,
                '_id': 0
            }
        },
        {
            $group: {
                _id: "$name", //分组依据
                Station_Id_C: {$first: "$Station_Id_C"},
                coordinates: {$first: "$coordinates"},
                // avgTemp: {$avg: "$docs.TEM"}, //统计TEM
                avgTemp: {$avg: "$docs.TEM"}, //统计TEM
            }
        },
    ], (err, doc) => {
        console.log(doc.length);
        res.json({
            result: doc
        })
    })
});


module.exports = router;
