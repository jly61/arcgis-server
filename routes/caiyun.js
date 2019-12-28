const express = require('express');
const router = express.Router();
const axios = require('axios')

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
        const tempArr = [];
        for (let i = 0; i < posts.length; i++) {
            // console.log(posts[i].data.result.daily.temperature[0].avg)
            tempArr.push(posts[i].data.result.hourly.temperature[0].value)
        }
        console.log(tempArr)
        res.send(tempArr)
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
