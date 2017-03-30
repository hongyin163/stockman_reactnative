var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');

class TradeStore {
	constructor() {
		this.list = [];
		this.bindListeners({
			handleLoadRecentTrade: actions.LOAD_RECENT_TRADE
		});
	}
	handleLoadRecentTrade(data) {
		this.list = data;
	}
}
module.exports = alt.createStore(TradeStore, 'TradeStore');