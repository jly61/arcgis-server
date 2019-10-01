//插入地区geojson到数据库中,用一次弃用
const express = require('express');
const router = express.Router();
const Dbs = require('../models/dbs');
const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'sichuan.json');


/* geojson插入数据库 */
router.get('/', function (req, res, next) {
    // fs.readFile(filePath, (err, data) => {
    //     let arr = [];
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         let str_data = data.toString();  //将二进制转换成string
    //         let json_data = JSON.parse(str_data);
    //         res.json({
    //             result: 'suc'
    //         });
    //         json_data.forEach((item) => {
    //             let dbs = new Dbs({
    //                 'Station_Id_C': item.Station_Id_C,
    //                 'coordinates': item.coordinates,
    //                 'name': item.name
    //             });
    //             arr.push(dbs);
    //         });
    //         Dbs.insertMany(arr, (err) => {
    //             console.log(err);
    //         })
    //         console.log('插入成功');
    //         // let str = JSON.stringify(json_data);
    //     }
    // });
});
module.exports = router;
