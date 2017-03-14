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
	GETMYPOSITION: host + 'api/trade/getMyPosition/',
	GETRECENTTRADES: host + 'api/trade/getRecentTrades/',
}
var obj = {
	getMyPosition: function (user_id, cb) {
		util.get(urls.GETMYPOSITION + user_id, function (results) {
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