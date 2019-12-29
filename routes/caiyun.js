const express = require('express');
const router = express.Router();
const axios = require('axios')

// 解决js乘法运算
function multi(num1, num2) {
    const num1String = num1.toString()
    const num2String = num2.toString()
    const num1Digits = (num1String.split('.')[1] || '').length
    const num2Digits = (num2String.split('.')[1] || '').length
    const baseNum = Math.pow(10, num1Digits + num2Digits)
    return Number(num1String.replace('.', '')) * Number(num2String.replace('.', '')) / baseNum
}
// 解决js乘法运算

// 彩云预报每小时全站点
router.post('/hour', function (req, res) {
    const points = req.body.points;

    function getPosts() {
        // 存储所有http请求
        let reqList = []
        // 存储后台响应每个请求后的返回结果
        let resList = []

        for (let i = 0; i < points.length; i++) {
            let req = axios.get(`https://api.caiyunapp.com/v2/mDY7pYLfwDHKFyEO/${points[i].docs[0].lon},${points[i].docs[0].lat}/hourly.json`)
            reqList.push(req)
            resList.push(('post' + (i + 1)).replace(/[']+/g, ''))
        }

        return axios.all(reqList).then(axios.spread(function (...resList) {
            // console.log(resList)
            return resList // 拿到所有posts数据
        }))
    }

    async function renderPage() {
        let posts = await getPosts()
        const elementArr = [];
        const tempList = []
        const rainList = []
        const humidityList = []
        const presList = []
        for (let i = 0; i < posts.length; i++) {
            // console.log(posts[i].data.result.daily.temperature[0].avg)
            const data = posts[i].data.result.hourly
            tempList.push(data.temperature[0].value)
            rainList.push(data.precipitation[0].value)
            humidityList.push(multi(data.humidity[0].value, 100))
            presList.push((data.pres[0].value / 100).toFixed(2))
        }
        console.log(elementArr)
        res.send({
            tempList: tempList,
            rainList: rainList,
            humidityList: humidityList,
            presList: presList
        })
    }

    renderPage()
});

// 彩云预报天级全站点
router.post('/daily', function (req, res) {
    const points = req.body.points;

    function getPosts() {
        // 存储所有http请求
        let reqList = []
        // 存储后台响应每个请求后的返回结果
        let resList = []

        for (let i = 0; i < points.length; i++) {
            let req = axios.get(`https://api.caiyunapp.com/v2/mDY7pYLfwDHKFyEO/${points[i].docs[0].lon},${points[i].docs[0].lat}/daily.json`)
            reqList.push(req)
            resList.push(('post' + (i + 1)).replace(/[']+/g, ''))
        }

        return axios.all(reqList).then(axios.spread(function (...resList) {
            // console.log(resList)
            return resList // 拿到所有posts数据
        }))
    }

    async function renderPage() {
        let posts = await getPosts()
        const tempArr = [];
        for (let i = 0; i < posts.length; i++) {
            // console.log(posts[i].data.result.daily.temperature[0].avg)
            tempArr.push(posts[i].data.result.daily.temperature[0].avg)
        }
        console.log(tempArr)
        res.send(tempArr)
    }

    renderPage()
});

// 获取彩云api frost、temp预报
router.post('/frost', function (req, res) {
    const points = req.body.points;
    const time = req.body.time;

    function getPosts() {
        // 存储所有http请求
        let reqList = []
        // 存储后台响应每个请求后的返回结果
        let resList = []

        for (let i = 0; i < points.length; i++) {
            let req = axios.get(`https://api.caiyunapp.com/v2/mDY7pYLfwDHKFyEO/${points[i].docs[0].lon},${points[i].docs[0].lat}/hourly.json`)
            reqList.push(req)
            resList.push(('post' + (i + 1)).replace(/[']+/g, ''))
        }

        return axios.all(reqList).then(axios.spread(function (...resList) {
            // console.log(resList)
            return resList // 拿到所有posts数据
        }))
    }

    async function renderPage() {
        let posts = await getPosts()
        const tempArr = [];
        // for (let i = 0; i < posts.length; i++) {
        //     // console.log(posts[i].data.result.daily.temperature[0].avg)
        //     tempArr.push(posts[i].data.result.daily.temperature[0].min)
        // }
        for (let i = 0; i < posts.length; i++) {
            // console.log(posts[i].data.result.daily.temperature[0].avg)
            let minTemp24 = [];
            for (let j = 0; j < time; j++) {
                minTemp24.push(posts[i].data.result.hourly.temperature[j].value)
            }
            tempArr.push(Math.min(...minTemp24))
        }
        console.log(tempArr)
        res.send(tempArr)
    }

    renderPage()
});

router.post('/rain', function (req, res) {
    const points = req.body.points;
    const time = req.body.time;

    function getPosts() {
        // 存储所有http请求
        let reqList = []
        // 存储后台响应每个请求后的返回结果
        let resList = []

        for (let i = 0; i < points.length; i++) {
            let req = axios.get(`https://api.caiyunapp.com/v2/mDY7pYLfwDHKFyEO/${points[i].docs[0].lon},${points[i].docs[0].lat}/hourly.json`)
            reqList.push(req)
            resList.push(('post' + (i + 1)).replace(/[']+/g, ''))
        }

        return axios.all(reqList).then(axios.spread(function (...resList) {
            // console.log(resList)
            return resList // 拿到所有posts数据
        }))
    }

    async function renderPage() {
        let posts = await getPosts()
        const rainArr = [];
        // for (let i = 0; i < posts.length; i++) {
        //     // console.log(posts[i].data.result.daily.temperature[0].avg)
        //     tempArr.push(posts[i].data.result.daily.temperature[0].min)
        // }
        for (let i = 0; i < posts.length; i++) {
            // console.log(posts[i].data.result.daily.temperature[0].avg)
            let sumRain24 = [];
            for (let j = 0; j < time; j++) {
                sumRain24.push(posts[i].data.result.hourly.precipitation[j].value)
            }
            rainArr.push(eval(sumRain24.join('+')))
        }
        console.log(rainArr)
        res.send(rainArr)
    }

    renderPage()
});


module.exports = router;
