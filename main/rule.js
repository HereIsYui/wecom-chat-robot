const { UserSignIn, GetGroupRanking } = require("./func");
const { RES_STR } = require('../config');


const GlobalRuleList = [{
	rule: /^群签到/,
	func: async (data, res) => {
		let cb = await UserSignIn(data, res);
		return cb;
	}
}, {
	rule: /^(群排名)/,
	func: async (data, res) => {
		let cb = await GetGroupRanking(data, res);
		return cb;
	}
}, {
	rule: /.+/,
	func: async (data, res) => {
		let cb = RES_STR;
		return cb;
	}
}]

module.exports = {
	GlobalRuleList
}