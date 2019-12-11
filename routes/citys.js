// 查询城市id
const express = require('express');
const router = express.Router();
const Citys = require('../models/citys');



/* geojson插入数据库 */
router.get('/', function (req, res, next) {
    const name = req.query.cityName;
    const param = {
        Station_name: name
    }
    Citys.find(param, (err, doc) => {
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
