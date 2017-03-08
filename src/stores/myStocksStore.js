var React = require('react-native');
var {
	AsyncStorage,
} = React;
var alt = require('../actions/alt');
var actions = require('../actions/myStockAction');
var dataStock = require('../actions/dataStock');

var {
	stockLocal
} = require('../actions/dataLocal');
/*            { name: 'id', type: 'string' },//0
            { name: 'date', type: 'string' },//0
            { name: 'code', type: 'string' },//0
            { name: 'symbol', type: 'string' },//0
            { name: 'type', type: 'string' },//0
            { name: 'name', type: 'string' },//0
            { name: "price", type: 'float' },//0
            { name: "yestclose", type: 'float' },
            { name: "state", type: 'string' },
            { name: "sort", type: 'int' },
            { name: "inhand", type: 'bool' },
            { name: 'day', type: 'int' },
            { name: 'week', type: 'int' },
            { name: 'month', type: 'int' },
            { name: 'last_day', type: 'int' },
            { name: 'last_week', type: 'int' },
            { name: 'last_month', type: 'int' }
*/
class MyStocksStore {
	constructor() {
		this.errorMessage = null;
		this.stockList = [];
		this.isLoading = false;
		//this.loadingText="加载中..."
		this.sort = '';
		this.tech = {
			code: 'T0001',
			name: 'MACD'
		}
		this.bindListeners({
			handleAdd: actions.ADD,
			handleRemove: actions.REMOVE,
			handleSetInHand: actions.SET_IN_HAND,
			handleLoadMyStock: actions.LOAD_MY_STOCK,
			handleDownLoadMyStock: actions.DOWN_LOAD,
			handleUpdateState: actions.UPDATE_STATE,
			handleUpdatePrice: actions.UPDATE_PRICE,
			handleSetTop: actions.SET_TOP,
			handleLoadFailed: actions.LOAD_FAILED,
			handleSetLoading: actions.SET_LOADING,
			handleSort: actions.SORT,
			handleSetTech: actions.SET_TECH
		});
	}
	handleLoadMyStock(stocks) {
		var me = this;
		me.stockList = stocks;
		// me.isLoading=false;
		me.errorMessage = null;
	}
	handleDownLoadMyStock(stocks) {
		this.stockList = stocks;
		this.syncToLocal();
	}
	handleUpdatePrice(stocks) {
		this.stockList = stocks;
		// this.isLoading=false;
		this.errorMessage = null;
	}
	handleUpdateState(stocks) {
		this.stockList = stocks;
		// this.isLoading=false;
		this.errorMessage = null;
	}
	handleSetTop(code) {
		var me = this;
		var stocks = me.stockList;
		if (stocks.length > 2) {
			var target = null;
			stocks.forEach((item) => {
				if (item.code == code) {
					target = item;
					return false;
				}
			});

			var sortList = stocks.sort(function (a, b) {
				// if(b.code==code){
				// 	target=b;
				// }
				return b.sort - a.sort;
			});
			if (target)
				target.sort = sortList[0].sort + 10;
			me.stockList = me.sortList(me.stockList, me.sort);
		}
		me.syncToLocal();
	}
	handleAdd(stock) {
		if (!this.stockList || !this.stockList.map) {
			this.stockList = [];
		}
		if (this.stockList.length > 0) {
			var items = [];
			var count = 0;
			this.stockList.forEach((item) => {
				if (item.code == stock.code) {
					count++;
				}
			});
			if (count > 0) {
				return;
			}
		}
		this.stockList.push(stock);
		this.handleSetTop(stock.code);
	}
	handleLoadFailed(errorMessage) {
		this.errorMessage = errorMessage;
		this.isLoading = false;
	}
	handleSetLoading(isLoading) {
		this.isLoading = isLoading;
		this.errorMessage = null;
	}
	handleRemove(code) {
		var me = this;
		var n = -1;
		me.stockList.map(function (item, i) {
			if (item.code == code) {
				n = i;
			}
		});
		me.stockList.splice(n, 1);
		me.syncToLocal();
	}
	handleSetInHand(obj) {
		var me = this;

		var code = obj.code;
		var inhand = obj.inhand;

		var n = -1;
		me.stockList.map(function (item, i) {
			if (item.code == code) {
				n = i;
			}
		});
		me.stockList[n].inhand = inhand;
		me.stockList = me.sortList(me.stockList, me.sort);
		me.syncToLocal();
	}
	handleSort(direction) {
		this.sort = direction;
		this.stockList = this.sortList(this.stockList, this.sort);
	}
	handleSetTech(tech) {
		this.tech.code = tech.code;
		this.tech.name = tech.name;
	}
	sortList(list, sort) {
		var top = [];
		var last = [];
		list.forEach(function (obj) {
			if (obj.inhand == true) {
				top.push(obj);
			} else {
				last.push(obj);
			}
		});
		last = last.sort(function (a, b) {
			if (sort == 'asc') {
				return (a.percent - b.percent);
			} else if (sort == 'desc') {
				return (b.percent - a.percent);
			} else {
				return b.sort - a.sort;
			}
		});
		return top.concat(last);
	}
	syncToLocal() {
		stockLocal.save(this.stockList);
	}
}
module.exports = alt.createStore(MyStocksStore, 'MyStocksStore');