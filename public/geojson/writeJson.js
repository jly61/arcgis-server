/*
 *
 * 将每个市的区站号写入json
 */

// let aba = [56172, 56183, 56184, 56180, 56182, 56097, 56168, 56178, 56185, 56164, 56171, 56079, 56173];
// let baZhong = [57313, 57313, 57320, 57216, 57324];
// let chengDu = [56286, 56286, 56286, 56286, 56286, 56286, 56290, 56290, 56187, 56288, 56296, 56272, 56285, 56281, 56276, 9, 56188, 56189, 56284, 56181];
// let daZhou = [57328, 57328, 57326, 57329,57420, 57413, 57237];
// let deYang = [56198, 56199, 56198, 56197, 56197, 56186];
// let ganZi = [56374, 56371, 56263, 56462, 56267, 56167, 56158, 56146, 56251, 56144, 56147,56038, 56152, 56257, 56247, 56443, 56357, 56441];
// let guangAn = [57415, 57415, 57414, 57417, 57416, 57415];
// let guangYuan = [57206, 57206, 57206, 57217, 57204, 57208, 57303];
// let leShan = [56386, 56386, 56386, 56386, 56389, 56390, 56382, 56490, 56387, 56480, 56385];
// let liangShan = [56571, 56459, 56565, 56569, 56671, 56675, 56578, 56575, 56580, 56584, 56479, 56478, 56474, 56475, 56473, 56487, 56485];
// let luZhou = [57508, 57508, 57508, 57508, 57603, 57608];
// let meiShan = [56391, 56289, 56297, 56380, 56381, 56383];
// let mianYang = [9, 9, 9, 57307, 57308, 9, 9, 9, 9];
// let nanCh = [57411, 57411, 57411, 57314, 57318, 57317, 57315, 57309, 57306];
//  let neiJ = [57503, 57503, 56395, 56393, 57507];
// let panZh = [56666, 56666, 56674, 56670, 56665];
// let suiN = [57405, 57405, 57402, 57401, 57405];
// let yaAn = [56280, 56280, 56373, 56376, 56378, 56278, 56279, 56273];
// let yiBin = [56492, 56493, 56491, 57600, 56593, 56592, 56499, 56498, 56496, 56494];
// let ziG = [56396, 56396, 56396, 56396, 56394, 56399];
let ziY = [56298, 57408, 57407];
// console.log(abaJson.features[0].properties.name);
// abaJson.features[index].properties.Station_Id_C = item;
const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'ziyang/ziyang.json');
fs.readFile(filePath, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        let str_data = data.toString();  //将二进制转换成string
        let json_data = JSON.parse(str_data);  //将string转换成json
        //修改站点数组名
        ziY.forEach((item, index) => {
            json_data.features[index].properties.Station_Id_C = item;
        });
        let str = JSON.stringify(json_data);
        fs.writeFile(filePath, str, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('添加成功');
            }
        })
    }
});