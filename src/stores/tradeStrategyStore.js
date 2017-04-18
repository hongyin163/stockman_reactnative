var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');
import { strategyLocal } from '../actions/dataLocal';
import { Map, List } from 'immutable';

class TradeStrategyStore {
	constructor() {
		this.list = List([]);
		this.origin = List([]);
		this.message = '';
		this.bindListeners({
			handleLoadTradeStrategy: actions.LOAD_TRADE_STRATEGY,
			handleSaveTradeStrategy: actions.SAVE_TRADE_STRATEGY,
			handleAddStrategy: actions.ADD_STRATEGY,
			handleRemoveStrategy: actions.REMOVE_STRATEGY,
			handleCancleChangeStrategy: actions.CANCEL_CHANGE_STRATEGY,
		});
	}
	handleLoadTradeStrategy(data) {
		var me = this;
		me.message = '';
		me.list = List(data);
		me.origin = me.list;
		me.syncToLocal();
	}
	handleSaveTradeStrategy(result) {
		this.message = result.content;
		if (result.code == '200') {
			this.origin = this.list;
			this.syncToLocal();
		}
	}
	handleAddStrategy(code) {
		var me = this;
		me.message = '';
		me.list = me.list.push(code);
		// me.changed = (me.origin.join(',') != me.list.join(','));
	}
	handleRemoveStrategy(code) {
		var me = this;
		me.message = '';
		var i = me.list.findIndex((item, n) => {
			if (item == code) {
				return true;
			}
		});
		if (i >= 0) {
			me.list = me.list.delete(i);
			// me.changed = (me.origin.join(',') != me.list.join(','));
		}
	}
	handleCancleChangeStrategy() {
		this.list = this.origin;
	}
	syncToLocal() {
		strategyLocal.save(this.list.toJS());
	}
}
module.exports = alt.createStore(TradeStrategyStore, 'TradeStrategyStore');