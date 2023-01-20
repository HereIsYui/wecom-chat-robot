import { GlobalRuleList } from './rule';

// 判断对话是否需要回复
export const main = async function (data, res) {
    let msg = data.spoken;
    for (let r of GlobalRuleList) {
        if (r.rule.test(msg)) {
            cb = await r.func(data, res);
            break;
        }
    }
}