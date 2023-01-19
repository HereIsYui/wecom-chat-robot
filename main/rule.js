


export const GlobalRuleList = [{
	rule: /^群签到/,
	func: async (user, msg, atMe) => {
		let cb = await UserSignIn(user, msg, atMe);
		return cb;
	}
}, {
	rule: /^(群排名)/,
	func: async (user, msg, atMe) => {
		let cb = await GetGroupRanking(user, msg, atMe);
		return cb;
	}
}]