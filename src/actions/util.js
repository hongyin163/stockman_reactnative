var {
	userLocal
} = require('./dataLocal');
var Base64 = require('../libs/base64');

import Toast from '../components/control/toast';

module.exports = {
	_token: '',
	get: function (url, successCallback, errorCallback) {
		var me = this;
		me.getToken(function (token) {
			fetch(url, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Origin': 'http://localhost',
					'Authorization': token
				}
			}).then((response) => {
				return response.json()
			}).then((responseJson) => {
				successCallback && successCallback(responseJson);
			}).catch((error) => {
				errorCallback && errorCallback(error);
				Toast.show(error.message);
			});
		})
	},
	post: function (url, data, successCallback, errorCallback) {
		var me = this;
		var body = '';
		if (typeof data == 'object') {
			body = JSON.stringify(data);
		} else {
			body = data;
		}
		me.getToken(function (token) {
			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Origin': 'http://localhost',
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: body
			}).then((response) => {
				if (response.status == 200)
					return response.json();
				else
					throw new Error(response.status, response.statusText);
			}).then((responseJson) => {
				successCallback && successCallback(responseJson);
			}).catch((error) => {
				errorCallback && errorCallback(error.message);
				Toast.show(error.message);
			});
		})
	},
	auth: function (url, data, successCallback, errorCallback) {
		var me = this;
		var body = '';
		if (typeof data == 'object') {
			body = JSON.stringify(data);
		} else {
			body = data;
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Origin': 'http://localhost',
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + Base64.encode('guest:guest')
			},
			body: body
		}).then((response) => {
			if (response.status == 200)
				return response.json();
			else
				throw new Error(response.status, response.statusText);
		}).then((responseJson) => {
			successCallback && successCallback(responseJson);
		}).catch((error) => {
			errorCallback && errorCallback(error.message);
			Toast.show(error.message);
		});
	},
	getToken: function (callback) {
		var me = this;
		if (me._token) {
			callback && callback(me._token);
			return;
		};
		userLocal.get(function (err, user) {
			debugger;
			if (err) {
				me._token = 'Basic ' + Base64.encode('guest:guest');
				callback && callback(me._token);
			} else {
				me._token = 'Basic ' + Base64.encode(user.id + ':' + user.password);
				callback && callback(me._token);
			}
		})
	},
	getAvg: function (c1, data, i) {
		var v = 0;
		if (i >= c1) {
			var n = 0;
			for (j = 0; j < c1; j++) {
				n += data[i - j][2];
			}
			v = n / c1;
			return v;
		} else {
			return data[i][2];
		}
	}
};