var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');
import { Map, List } from 'immutable';

class PositionAddStore {
	constructor() {
		this.initAmount = 1000000;
		this.account = Map({
			init: void 0,
			total: 0,//总市值
			amount: 0,//账户余额
			mv: 0,//市值
			percent: 0,//盈亏百分比
			positions: List([])//持仓股票
		})
		this.bindListeners({
			handleLoadMyPosition: actions.LOAD_MY_POSITION,
			handleLoadMyAmount: actions.LOAD_MY_AMOUNT
		});
	}
	handleLoadMyPosition(data) {
		var me = this;
		var list = List(data);
		var amount = me.account.get('amount');
		var mv = list.reduce(function (previous, current) {
			return previous + (current.count * current.price);
		}, 0);
		var total = (amount + mv).toFixed(2);
		var percent = ((total - me.initAmount) * 100 / me.initAmount).toFixed(2)
		me.account = me.account.merge({
			total: total,//总资产
			mv: mv,//市值
			percent: percent,//盈亏百分比
			positions: list
		});
	}
	handleLoadMyAmount(data) {
		debugger;
		var me = this;
		if (data.init === false) {
			me.account.init = data.init;
			return;
		}
		var total = data.amount + data.mv;
		var account = {
			init: data.init,
			total: total,//总资产
			amount: data.amount,//账户余额
			mv: data.mv,//市值
			percent: ((total - me.initAmount) * 100 / me.initAmount).toFixed(2),//盈亏百分比
			positions: List(data.positions)
		};
		me.account = me.account.merge(account);
	}
}
module.exports = alt.createStore(PositionAddStore, 'PositionAddStore');