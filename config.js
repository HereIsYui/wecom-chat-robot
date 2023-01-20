// 积分名称配置
const POINT_NAME = "鱼皮";
// 每日签到奖励配置
const SIGN_POINT = {
    MAX: 20,
    MIN: 10
}
// 重复签到扣分配置
const REPEATED_SIGN = {
    MAX: 10,
    MIN: 1
}
// 默认返回值
const RES_STR = {
    code: 0,
    message: 'success',
    data: {
        type: 5000,
        info: {
            text: ''
        }
    }
}
// 发消息默认结构
const SEND_MSG_BODY = {
    socketType: 2,
    list: [
        {
            type: 203,
            titleList: [
                "🐟π FishPi Offical"
            ],
            receivedContent: "",
            atList: []
        }
    ]
}

module.exports = {
    POINT_NAME,
    SIGN_POINT,
    REPEATED_SIGN,
    RES_STR,
    SEND_MSG_BODY
}