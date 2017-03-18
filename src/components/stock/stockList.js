/* @flow */
'use strict';

import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	View,
	Text,
	ListView
} from 'react-native';

var TimerMixin = require('react-timer-mixin');
var StockItem = require('./editItem');
var {
	ToolbarAndroid
} = require('react-native-android-lib');
var { Icon, } = require('react-native-icons');
var DataAdapter = require('../chart/techDataAdapter');
var TimerMixin = require('react-timer-mixin');
var myStockAction = require('../../actions/myStockAction');
var Nav = require('../nav');
var StockDetail = require('./stockDetail');
var {ColorConfig} = require('../../config');
var PullToRefreshView = require('../control/pullToRefresh');

//<ObjectList data={} category={}/>
var ObjectList = React.createClass({
	onSetInMyHand: function () {
		this._rowViewStyle.style.right.setValue(0);
		myStockAction.setInHand(this.props.data.code, !this.props.data.inhand);
	},
	onSetTop: function () {
		this._rowViewStyle.style.right.setValue(0);
		myStockAction.setTop(this.props.data.code);
	},
	onRemove: function () {
		myStockAction.remove(this.props.data.code);
	},
	getActions: function (data) {
		var actions = [
			{
				title: data.inhand ? '标为空仓' : '标为持仓',
				width: 100
			},
			{
				title: '置顶',
				width:60
			},
			{
				title: '删除',
				width:60
			}
		];
		return actions;
	},
	onActionSelect: function (action, data) {
		var me = this;
		if (action.title == '删除') {
			myStockAction.remove(data.code);
		} else if (action.title == '置顶') {
			myStockAction.setTop(data.code);
		} else if (action.title == '标为空仓' || action.title == '标为持仓') {
			myStockAction.setInHand(data.code, !data.inhand);
		}
	},
	createRows: function () {
		var me = this;
		var list = me.props.data;
		if (list && list.length > 0) {
			return list.map(function (obj) {
				return (<StockItem key={obj.code} id={obj.code} data={obj} actions={me.getActions(obj)} onActionSelect={me.onActionSelect}></StockItem>);
			});
		} else {
			return [];
		}
	},
	onRefresh: function (argument) {
		this.props.onRefresh && this.props.onRefresh();
	},
	setRefreshing: function (isLoading) {
		this._refresh && this._refresh.setRefreshing(isLoading);
	},
	onSelect: function (data) {
		Nav.open(<StockDetail name={data.name} code={data.code} cycle={"day"} />);

	},
	renderRow: function (obj) {
		var me = this;
		return (<StockItem key={obj.code} id={obj.code} data={obj}
			actions={me.getActions(obj)}
			onActionSelect={me.onActionSelect}
			onSelect={this.onSelect} />);
	},
	render: function () {

		var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) =>{
			
			 return r1.code != r2.code

			}
		 });
		return (
			<PullToRefreshView
				style={styles.container}
				ref={(control) => this._refresh = control}
				onRefresh={this.onRefresh}>
				<ListView
					enableEmptySections={true}
					pageSize={10}
					dataSource={ds.cloneWithRows(this.props.data)}
					renderRow={this.renderRow} />

			</PullToRefreshView>
		);
	}
});
//       <ScrollView style={{flex:1}}>			
// {this.createRows()}
//       </ScrollView>   

var styles = StyleSheet.create({
	container: {
		flex: 1
	}
});


module.exports = ObjectList;
