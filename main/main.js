const { GlobalRuleList } = require('./rule');

// 判断对话是否需要回复
async function main(data, res) {
    let msg = data.spoken;
    for (let r of GlobalRuleList) {
        if (r.rule.test(msg)) {
            cb = await r.func(data, res);
            break;
        }
    }
}

module.exports = {
    main
};