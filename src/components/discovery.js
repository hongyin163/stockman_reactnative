/* @flow */
'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	IntentAndroid,
	NativeAppEventEmitter
} from 'react-native';

var { Icon, } = require('react-native-icons');
var IconButton = require('./control/button');
var Titlebar = require('./control/titlebar');
var Nav = require('./nav');
var StockRecoCross = require('./stock/stockRecoCross');
var StockRecoRank = require('./stock/stockRecoRank');
var StockRecoState = require('./stock/stockRecoState');
var SubApp = require('./control/subApp');

var host = 'http://www.mandata.cn/weixin';
var actions = {
	'recommend': '/app/stock/index.html#/list/rank',
	'cross': '/app/stock/index.html#/list/cross',
	'state': '/app/stock/index.html#/list/state',
	'forecast': '/app/stock/view/forecast.html',
	'practice': '/app/stock/view/practice.html'
}
var Discovery = React.createClass({
	open: function (url) {
		// IntentAndroid.canOpenURL(url, (supported) => {
		//   if (supported) {
		//     IntentAndroid.openURL(url);
		//   } else {
		//     console.log('Don\'t know how to open URI: ' + url);
		//   }
		// });
		NativeAppEventEmitter.emit('subApp', { url: url });
	},
	onOpenMenu: function (argument) {
		Nav.openMenu()
	},
	setUrl: function (code, title) {
		var me = this;
		return function () {
			//me.open(host+actions[code]);
			Nav.open(<SubApp url={host + actions[code]} title={title} />);
		}

	},
	render: function () {
		return (
			<View style={styles.container}>
				<Titlebar >
					<IconButton onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"#FFFFFF"} />
					<View style={{ flex: 1 }}></View>
					<IconButton onPress={this.onOpenMenu} icon={"fontawesome|search"} color={"#FFFFFF"} />
				</Titlebar>
				<View style={styles.section}>
					<IconButton onPress={() => Nav.open(<StockRecoRank />)} style={[styles.button,styles.buttonFirst]} text={"综合推荐"} color={"#000"} icon={"fontawesome|cube"} />
					<IconButton onPress={() => Nav.open(<StockRecoCross />)} style={styles.button} text={"最爱金叉"} color={"#000"} icon={"fontawesome|random"} />
					<IconButton onPress={() => Nav.open(<StockRecoState />)} style={styles.button} text={"周期反转"} color={"#000"} icon={"fontawesome|recycle"} />
				</View>
				<View style={styles.section}>
					<IconButton onPress={this.setUrl('practice', '月光宝盒')} style={styles.button} text={"月光宝盒"} color={"#000"} icon={"fontawesome|inbox"} />
				</View>
			</View>
		);
	}
});

//<IconButton onPress={this.setUrl('forecast','走势模拟')}  style={styles.button}  text={"走势模拟"} color={"#000"}  icon={"fontawesome|line-chart"} />
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#EBEBEB'
	},
	button: {
		height: 50,		
		borderBottomWidth: 1,
		borderBottomColor: '#EAEAEA',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor:'#FFFFFF'
	},
	buttonFirst: {
		borderTopColor: '#EAEAEA',
		borderTopWidth: 1
	},
	buttonLast: {

	},
	section: {
		marginTop: 26,
		backgroundColor:'#FFFFFF'
	}
});


module.exports = Discovery;
