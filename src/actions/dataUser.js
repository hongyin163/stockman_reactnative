'use strict';

var React = require('react-native');
var {
	userLocal
} = require('./dataLocal');
var Util = require('./util.js');
import Toast from '../components/control/toast';
import rsaKey from './rsaKey';
import { JSEncrypt } from 'jsencrypt';
var {
	AsyncStorage,
} = React;

var {
	ServerConfig
} = require('../config');

var host = ServerConfig.host;

module.exports = {
	saveSSOAcount: function (user, success, error) {
		var me = this;
		var url = host + 'api/users/SaveSSOAcount';
		var data = {
			id: user.id,
			name: user.username,
			password: user.password,
			sso: user.sso
		};
		var encrypt = new JSEncrypt();
		encrypt.setPublicKey(rsaKey.PublicKey);
		var body = JSON.stringify(data);
		body = encrypt.encrypt(body);
		body = JSON.stringify(body);
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Origin': 'http://localhost',
				'Content-Type': 'application/json;charset=utf-8',
				'Authorization': 'Basic ' + encrypt.encrypt('guest:guest')
			},
			body: body
		}).then((response) => {
			if (response.status == 200)
				return response.json();
			else
				throw new Error(response.status, response.statusText);
		}).then((responseJson) => {
			success && success(responseJson);
		}).catch((error) => {
			error && error(error.message);
			Toast.show(error.message);
		});
	},
	saveLocalInfo: function (info, callback) {
		userLocal.save(info, callback);
	},
	getLocalInfo: function (callback) {
		userLocal.get(callback);
	}
}