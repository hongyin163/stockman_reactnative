/* @flow */
'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	InteractionManager
} from 'react-native';

var {ColorConfig} = require('../../config');
var objectAction = require('../../actions/objectAction');
var ObjectItemStore = require('../../stores/objectInfoStore');

var PriceInfo = React.createClass({
	getInitialState: function () {
		return {
			isLoading: true,
			data: null
		};
	},
	componentWillUnmount: function () {
		ObjectItemStore.unlisten(this.onChange);
	},
	componentDidMount: function () {
		var me = this;
		ObjectItemStore.listen(this.onChange);
		InteractionManager.runAfterInteractions(() => {
			objectAction.loadObjectInfo(me.props.type, me.props.code);
		});
	},
	onChange: function (store) {
		this.setState(function (state) {
			for (var p in store) {
				state[p] = store[p];
			}
		});
	},
	getPricePercentage: function (values) {
		if (values.percent > 0)
			return <Text key={"percent"} style={styles.percentUp}>+{values.percent}%</Text>;
		else
			return <Text key={"percent"} style={styles.percentDown}>{values.percent}%</Text>;
	},
	getPriceChange: function (values) {
		var views = [];
		if (values.updown > 0) {
			views.push(<Text key={"price"} style={styles.priceUp}>{values.price} </Text>);
			views.push(<Text key={"updown"} style={styles.priceUp}>+{values.updown}</Text>);
		}
		else {
			views.push(<Text key={"price"} style={styles.priceDown}>{values.price}</Text>);
			views.push(<Text key={"updown"} style={styles.priceDown}>{values.updown}</Text>);
		}
		return views;
	},
	getVolume: function (values) {
		if (values.volume > 100000000)
			return (values.volume / 100000000).toFixed(1) + '亿';
		if (values.volume > 10000)
			return (values.volume / 10000).toFixed(1) + '万';
		return values.volume;
	},
	getTurnover: function (values) {
		if (values.turnover > 100000000)
			return (values.turnover / 100000000).toFixed(1) + '亿';
		if (values.turnover > 10000)
			return (values.turnover / 10000).toFixed(1) + '万';
		return values.turnover;
	},
	getAmplitude: function (values) {
		var value = (values.high - values.low) * 100 / values.yestclose;
		return value.toFixed(2);
	},
	// getCatePercentage: function (values) {
	//  if (values.bid3 > 0)
	//      return "<span class='up'>+" + values.bid3 + "%<span>";
	//  else
	//      return "<span class='down'>" + values.bid3 + "%<span>";
	// },
	render: function () {
		if (this.state.data == null)
			return (<View style={styles.container}></View>);
		var data = this.state.data;
		return (
			<View style={[styles.container]}>
				<View style={styles.priceRow}>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						{this.getPricePercentage(data)}
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
						{this.getPriceChange(data)}
					</View>
				</View>
				<View style={styles.objecInfo}>
					<View style={styles.itemRow}>
						<Text style={styles.item}>昨收:{data.yestclose}</Text>
						<Text style={styles.item}>今开:{data.open}</Text>
					</View>
					<View style={styles.itemRow}>
						<Text style={styles.item}>最高:{data.high}</Text>
						<Text style={styles.item}>最低:{data.low}</Text>
					</View>
					<View style={styles.itemRow}>
						<Text style={styles.item}>成交量:{this.getVolume(data)}</Text>
						<Text style={styles.item}>成交额:{this.getTurnover(data)}</Text>
					</View>
				</View>

			</View>
		);
	}
});
//"{\"code\":\"0000001\",\"date\":\"2016-04-29T00:00:00\",\"open\":2935.38,\"price\":2938.32,\"yestclose\":2945.59,
//\"high\":2950.58,\"low\":2930.36,\"percent\":-0.25,\"updown\":-7.27,\"volume\":109310628.0,\"turnover\":12850273.0}"
var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	priceRow: {
		flex: 1.5,
		flexDirection: 'column',
		padding: 3,
	},
	objecInfo: {
		flex: 3,
		flexDirection: 'column',
	},
	itemRow: {
		flex: 1,
		flexDirection: 'row',
		padding: 3
	},
	item: {
		flex: 1
	},
	percentUp: {
		fontSize: 35,
		color: ColorConfig.candle.up
	},
	percentDown: {
		fontSize: 35,
		color: ColorConfig.candle.down
	},
	priceUp: {
		width: 50,
		fontSize: 15,
		color: ColorConfig.candle.up,
		textAlign: 'center',
		margin: 2
	},
	priceDown: {
		fontSize: 15,
		color: ColorConfig.candle.down,
		textAlign: 'center',
		margin: 5
	}

});


module.exports = PriceInfo;
