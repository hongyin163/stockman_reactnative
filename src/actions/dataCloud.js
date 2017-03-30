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
	GETMYPOSITION: host + 'api/trade/GetMyPosition/',
	GETRECENTTRADES: host + 'api/trade/GetTradeRecord/',
}
//
var obj = {
	getMyPosition: function (user_id, cb) {
		var url = urls.GETMYPOSITION + user_id;
		util.get(url, function (results) {
			cb && cb(results)
		});
	},
	getRecentTrades: function (user_id, cb) {
		util.get(urls.GETRECENTTRADES + user_id, function (results) {
			cb && cb(results)
		});
	}
}

module.exports = obj;