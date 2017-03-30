var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');
import { Map, List } from 'immutable';

class TradeStrategyStore {
	constructor() {
		this.list = List([]);
		this.bindListeners({
			handleLoadTradeStrategy: actions.LOAD_TRADE_STRATEGY,
			handleAddStrategy: actions.ADD_STRATEGY,
			handleRemoveStrategy: actions.REMOVE_STRATEGY
		});
	}
	handleLoadTradeStrategy(data) {
		this.list = List(data);
	}
	handleAddStrategy(item) {
		this.list = this.list.push(item);
	}
	handleRemoveStrategy(name) {
		var me = this;
		var i = me.list.findIndex((item, n) => {
			if (item.name == name) {
				return true;
			}
		});
		if (i >= 0) {
			me.list = me.list.delete(i);
		}
	}
}
module.exports = alt.createStore(TradeStrategyStore, 'TradeStrategyStore');