import { GlobalRuleList } from './rule';

// 判断对话是否需要回复
export const main = async function (data) {
    let msg = data.spoken;
    let user = data.receivedName;
    let atMe = data.atMe;
    for (let r of GlobalRuleList) {
        if (r.rule.test(msg)) {
            cb = await r.func(user, msg, atMe);
            break;
        }
    }
}