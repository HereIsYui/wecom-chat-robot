// 积分名称配置
export const POINT_NAME = "鱼皮";
// 每日签到奖励配置
export const SIGN_POINT = {
    MAX: 20,
    MIN: 10
}
// 重复签到扣分配置
export const REPEATED_SIGN = {
    MAX: 10,
    MIN: 1
}
// 默认返回值
export const RES_STR = {
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
export const SEND_MSG_BODY = {
    socketType: 2,
    list: [
        {
            type: 203,
            titleList: [
                "🐟π FishPi Offical"
            ],
            receivedContent: "你好~",
            atList: []
        }
    ]
}