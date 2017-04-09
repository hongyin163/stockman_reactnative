var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');

import { Map, List } from 'immutable';

class TradeStrategyStore {
	constructor() {
		this.list = List([]);
		this.message = '';
		this.bindListeners({
			handleLoadTradeStrategy: actions.LOAD_TRADE_STRATEGY,
			handleSaveTradeStrategy: actions.SAVE_TRADE_STRATEGY,
			handleAddStrategy: actions.ADD_STRATEGY,
			handleRemoveStrategy: actions.REMOVE_STRATEGY
		});
	}
	handleLoadTradeStrategy(data) {
		var me = this;
		me.message = '';
		me.list = List(data);
	}
	handleSaveTradeStrategy(result) {
		this.message = result.content;
	}
	handleAddStrategy(item) {
		var me = this;
		me.message = '';
		me.list = me.list.push(item);
	}
	handleRemoveStrategy(name) {
		var me = this;
		me.message = '';
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