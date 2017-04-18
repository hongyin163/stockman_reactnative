'use strict';

var React = require('react-native');
var {
	objectLocal,
	userLocal,
	strategyLocal
} = require('./dataLocal');
var util = require('./util');
var {
	AsyncStorage,
} = React;

var {
	ServerConfig
} = require('../config');
var host = ServerConfig.host;

const urls = {
	GET_MYPOSITION: host + 'api/trade/GetMyPosition/',
	GET_MYAMOUNT: host + 'api/trade/GetMyAmount/',
	GET_RECENTTRADES: host + 'api/trade/GetTradeRecord/',
	LOAD_STRATEGY: host + 'api/trade/GetStratety/',
	SAVE_STRATEGY: host + 'api/trade/SetStrategy/'
}
//
var obj = {
	getMyPosition: function (cb) {
		var url = urls.GET_MYPOSITION;
		util.get(url, function (results) {
			cb && cb(results)
		});
	},
	getMyAmount: function (cb) {
		var url = urls.GET_MYAMOUNT;
		util.get(url, function (results) {
			cb && cb(results)
		});
	},
	getRecentTrades: function (cb) {
		util.get(urls.GET_RECENTTRADES, function (results) {
			cb && cb(results)
		});
	},
	getTradeStrategy: function (cb) {
		strategyLocal.get(function (error, list) {
			if (!error && list) {
				cb(list);
				return;
			}

			util.get(urls.LOAD_STRATEGY, function (results) {
				cb && cb(results)
			});
			
		})

	},
	saveTradeStrategy: function (strategy, cb) {
		util.post(urls.SAVE_STRATEGY, strategy, function (results) {
			cb && cb(results)
		});
	}
}

module.exports = obj;