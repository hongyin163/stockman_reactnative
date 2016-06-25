var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');

class TradeStore {
	constructor() {
		this.data = {}
		this.bindListeners({
			handleLoadRecentTrade: actions.LOAD_RECENT_TRADE
		});
	}
	handleLoadRecentTrade(data) {
		this.data = data;
	}
}
module.exports = alt.createStore(TradeStore, 'TradeStore');