const axios = require("axios");
// WorkTool API
const BaseURL = 'https://worktool.asrtts.cn/wework/';
// 申请的机器人ID
const robotId = '';


const request = axios.create({
    baseURL: BaseURL,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});

const BotSendMsg = function (data) {
    request({
        method: 'POST',
        url: "sendRawMessage?robotId=" + robotId,
        data: data
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = {
    BotSendMsg
}