'use strict';

var React = require('react-native');
var {
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

module.exports = {
	saveSSOAcount: function(user,success,error) {
		var url = host + 'api/users/SaveSSOAcount';
		debugger;
		util.post(url, {
			id: user.id,
			name: user.username,
			password: user.password,
			sso: user.sso
		}, function(result) {
			success && success(result);

			// if (response.status == '200') {
			// 	var txt = response.responseText;
			// 	var u = eval('(' + txt + ')');

			// } else if (response.status == '204') {

			// 	StockMan.Common.alert("提示", "账号已存在！", function(btn) {});
			// } else {
			// 	StockMan.Common.alert(response.responseText);
			// }

		},function(errortext){
			error && error(errortext);
		});
	},
	saveLocalInfo:function (info,callback) {
		userLocal.save(info,callback);
	},
	getLocalInfo:function (callback) {
		userLocal.get(callback);
	}

}