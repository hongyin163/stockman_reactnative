var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');
import { Map, List } from 'immutable';
class TradeStore {
	constructor() {
		this.data = Map({
			loadState: 0,
			list: List([])
		});
		this.bindListeners({
			handleLoadRecentTrade: actions.LOAD_RECENT_TRADE
		});
	}
	handleLoadRecentTrade(data) {
		this.data = this.data
			.set('loadState', 1)
			.set('list', List(data));
	}
}
module.exports = alt.createStore(TradeStore, 'TradeStore');