'use strict';

var React = require('react-native');
var {
	objectLocal,
	userLocal
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
	GET_RECENTTRADES: host + 'api/trade/GetTradeRecord/',
	LOAD_STRATEGY: host + 'api/trade/GetStratety/',
	SAVE_STRATEGY: host + 'api/trade/SetStrategy/'
}
//
var obj = {
	getMyPosition: function (user_id, cb) {
		var url = urls.GET_MYPOSITION;
		debugger;
		util.get(url, function (results) {
			cb && cb(results)
		});
	},
	getRecentTrades: function (user_id, cb) {
		util.get(urls.GET_RECENTTRADES, function (results) {
			cb && cb(results)
		});
	},
	getTradeStrategy: function (cb) {
		util.get(urls.LOAD_STRATEGY, function (results) {
			cb && cb(results)
		});
	},
	saveTradeStrategy: function (strategy, cb) {		
		util.post(urls.SAVE_STRATEGY, strategy, function (results) {
			cb && cb(results)
		});
	}
}

module.exports = obj;