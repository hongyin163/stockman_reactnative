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
var ColorConfig = require('../../config').ColorConfig;
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	log: {
		flex: 1,
		padding: 5
	},
	logText: {
		fontSize: 15
	},
	btns: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20
	},
	btn: {
		backgroundColor: "#e5e5e5",
		margin: 5,
		borderRadius: 5
	}
});

var SyncData = React.createClass({
	getInitialState: function () {
		return {
			log: '备份或还原系统数据，包括自选股、周期、数据过滤设置等。\n'
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
			myObjectAction.downLoad(function (err, result) {
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
				me.setState(function (state) {
					state.log += "下载任务结束\n";
				})
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
				<View style={styles.log}>
					<Text style={styles.logText}>{this.state.log}</Text>
				</View>
				<View style={styles.btns}>
					<IconButton style={styles.btn} icon="fontawesome|cloud-download" color={ColorConfig.baseColor} text={'下载数据'} textColor={'#000'} onPress={this.onDownLoad} />
					<IconButton style={styles.btn} icon="fontawesome|cloud-upload" color={ColorConfig.baseColor} text={'上传数据'} textColor={'#000'} onPress={this.onUpLoad} />
				</View>
			</View>
		);
	}
});

module.exports = SyncData;