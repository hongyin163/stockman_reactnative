'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ToastAndroid
} from 'react-native';

var Titlebar = require('../control/titlebar');
var IconButton = require('../control/button');
var myStockAction = require('../../actions/myStockAction');
var myObjectAction = require('../../actions/objectAction');

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	log: {
		padding: 5
	}
});

var SyncData = React.createClass({
	getInitialState: function () {
		return {
			log: '备份或还原系统数据，包括自选股、周期、数据过滤等。\n'
		};
	},
	onDownLoad: function () {
		var me = this;
		me.setState(function (state) {
			state.log += "自选股【还原开始】\n";
		});

		myStockAction.downLoad(function (err, result) {
			if (result) {
				// ToastAndroid.show('自选股上传完成',ToastAndroid.SHORT);
				me.setState(function (state) {
					state.log += "自选股【还原完成】\n";
				});
			} else {
				me.setState(function (state) {
					state.log += "自选股【还原失败】\n";
				});
			}
			me.setState(function (state) {
				state.log += "周期【还原开始】\n";
			})
			debugger;
			myObjectAction.downLoad(function (err, result) {
				debugger;
				if (result) {
					// ToastAndroid.show('关注周期上传完成',ToastAndroid.SHORT);
					me.setState(function (state) {
						state.log += "周期【还原结束】\n";
					})
				} else {
					me.setState(function (state) {
						state.log += "周期【还原失败】\n";
					})
				}
			});
		});

	},
	onUpLoad: function () {
		var me = this;
		me.setState(function (state) {
			state.log += "自选股【备份开始】\n";
		})
		myStockAction.upLoad(function (err, result) {
			if (result) {
				// ToastAndroid.show('自选股上传完成',ToastAndroid.SHORT);
				me.setState(function (state) {
					state.log += "自选股【备份完成】\n";
				})
			} else {
				me.setState(function (state) {
					state.log += "自选股【备份失败】\n";
				})
			}
			me.setState(function (state) {
				state.log += "周期【备份开始】\n";
			})
			myObjectAction.upLoad(function (err, result) {
				debugger;
				if (result) {
					// ToastAndroid.show('关注周期上传完成',ToastAndroid.SHORT);
					me.setState(function (state) {
						state.log += "周期【备份结束】\n";
					})
				} else {
					me.setState(function (state) {
						state.log += "周期【备份失败】\n";
					})
				}
			});
		});

	},
	render: function () {
		return (
			<View style={styles.container}>
				<Titlebar showBack={true} title={"数据同步"} />
				<View style={{ flex: 1 }}>
					<IconButton text={'还原数据'} onPress={this.onDownLoad} />
					<IconButton text={'备份数据'} onPress={this.onUpLoad} />
					<View style={styles.log}>
						<Text>{this.state.log}</Text>
					</View>
				</View>
			</View>
		);
	}
});

module.exports = SyncData;