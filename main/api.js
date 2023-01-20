import axios from "axios";
import { SEND_MSG_BODY } from '../config'
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

export const BotSendMsg = function (data = SEND_MSG_BODY) {
    return request({
        method: 'POST',
        url: "sendRawMessage?robotId=" + robotId,
        data: data
    })
}