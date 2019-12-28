// 接口测试专用文件
const express = require('express');
const router = express.Router();
const axios = require('axios')

router.post('/hour', function (req, res) {
    const points = req.body.points;
    function getPosts() {
        // 存储所有http请求
        let reqList = []
        // 存储后台响应每个请求后的返回结果
        let resList = []

        for(let i = 0; i< points.length; i++) {
            let req = axios.get(`https://api.caiyunapp.com/v2/mDY7pYLfwDHKFyEO/${points[i].docs[0].lon},${points[i].docs[0].lat}/hourly.json`)
            reqList.push(req)
            resList.push(('post' + (i + 1)).replace(/[']+/g, ''))
        }

        return axios.all(reqList).then(axios.spread(function(...resList) {
            // console.log(resList)
            return resList // 拿到所有posts数据
        }))
    }

    async function renderPage() {
        let posts = await getPosts()
        const tempArr = [];
        for(let i = 0; i < posts.length; i++) {
            // console.log(posts[i].data.result.daily.temperature[0].avg)
            tempArr.push(posts[i].data.result.hourly.temperature[0].value)
        }
        console.log(tempArr)
        res.send(tempArr)
    }

    renderPage()
});

module.exports = router;
