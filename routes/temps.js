//测试温度用


const express = require('express');
const router = express.Router();
const article = require('../models/temps');
const Users = require('../models/users');

// mongoose.connect('mongodb://127.0.0.1:27017/non_space', {useNewUrlParser: true});
// mongoose.connection.on('connected', () => {
//     console.log('MongoDB connected success');
// });
// mongoose.connection.on('error', () => {
//     console.log('MongoDB connected failed');
// });
// mongoose.connection.on('disconnected', () => {
//     console.log('MongoDB connected disconnected');
// });

/* GET users listing. */
router.get('/', function (req, res, next) {
    Articles.find({}, (err, doc) => {
        if (err) {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            });
            console.log('err');
        } else {
            if(doc) {
                res.json({
                    status: 0,
                    msg: '请求成功',
                    result: doc
                });
                console.log('请求成功');
            }
        }
    })
});

router.get('/join', (req, res, next) => {
    Users.aggregate([
        {
            $match: {name: 'lee'}
        },
        {
            $lookup: {
                from: 'article',
                localField: 'name',
                foreignField: 'author',
                as: 'docs'
            }
        },
        {
            $match: {docs: {'title': '第二季'}}
        },
        // {
        //     $project: {
        //         'name': 1,
        //         // 'TEM': 1,
        //         'docs': 1,
        //         '_id': 0
        //     }
        // }
    ], (err, doc) => {
        console.log(doc);
        res.json({
            result: doc
        })
    })
});
module.exports = router;
