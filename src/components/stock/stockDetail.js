'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	ScrollView,
	InteractionManager,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
var TextButton = require('../control/button');
var Titlebar = require('../control/titlebar');
var IconButton = require('../control/button');
var PriceInfo = require('./stockInfo');
var KChart = require('../chart/kchart');
var TechChartList = require('../chart/techChartList');
var CandleChart = require('../chart/candleChart');
var CycleBar = require('../chart/cycleBar');
var StockItemStore = require('../../stores/stockPriceStore');
var myStockAction = require('../../actions/myStockAction');
var DataAdapter = require('../chart/techDataAdapter');
var TimerMixin = require('react-timer-mixin');
var myStockStore = require('../../stores/myStocksStore');
var Loading = require('../control/loading');
var {
	CombinedChart
} = require('react-native-chart-android');

var StockDetail = React.createClass({
	mixins: [TimerMixin],
	getInitialState: function () {
		var me = this;

		var state = {
			code: this.props.code,
			name: this.props.name,
			cycle: this.props.cycle,
			price: {},
			techCodeList: me.getTechCodeList(),
			top: new Animated.Value(130),
			priceTop: new Animated.Value(0),
			isMyStock: me.isMyStock(me.props.code)
		};
		state.price[state.cycle] = [];
		return state;
	},
	isMyStock: function (code) {
		var stocks = myStockStore.getState().stockList;
		if (!stocks || stocks.length == 0)
			return false;
		var count = 0;
		stocks.forEach((stock) => {
			if (stock.code == code) {
				count++;
			}
		});
		return count > 0;
	},
	componentDidMount: function () {
		StockItemStore.listen(this.onChange);
		var me = this;
		InteractionManager.runAfterInteractions(() => {
			myStockAction.loadPriceData(me.props.code, me.props.cycle);
		});
	},
	componentWillUnmount: function () {
		StockItemStore.unlisten(this.onChange);
	},
	getTechCodeList: function (argument) {
		var techLibs = DataAdapter.getAll();
		var techs = [];
		for (var pro in techLibs) {
			techs.push({ code: pro, name: techLibs[pro].name });
		}
		return techs;
	},
	onChange: function (store) {
		this.setState(function (state) {
			for (var p in store) {
				state[p] = store[p];
			}
		});
	},
	onCycleSelect: function (cycle, name) {
		myStockAction.loadPriceData(this.props.code, cycle);
	},
	_offset: 0,
	_isZoom: false,
	onScroll: function (e) {
		// debugger;
		var me = this;
		if (e.nativeEvent.contentOffset.y > this._offset) {
			if (!this._isZoom) {
				Animated.parallel([
					Animated.timing(
						this.state.top,         // Auto-multiplexed
						{
							toValue: 0,
							friction: 9,
							tension: 70
						},
					),
					Animated.timing(
						this.state.priceTop,         // Auto-multiplexed
						{
							toValue: -50,
							friction: 9,
							tension: 70
						},
					)
				]).start(() => {
					// me._scrollView.scrollTo(20);
				});
				this._isZoom = true;
			}
		} else {
			if (e.nativeEvent.contentOffset.y >= 0 && e.nativeEvent.contentOffset.y < 50) {
				if (this._isZoom) {
					Animated.parallel([
						Animated.timing(
							this.state.top,         // Auto-multiplexed
							{
								toValue: 130,
								friction: 9,
								tension: 70
							},
						),
						Animated.timing(
							this.state.priceTop,         // Auto-multiplexed
							{
								toValue: 0,
								friction: 9,
								tension: 70
							},
						)
					]).start();
					this._isZoom = false;
				}
			}
		}
		this._offset = e.nativeEvent.contentOffset.y;
	},
	onNext: function (argument) {
		this._cycleBar.next();
	},
	onAdd: function (argument) {
		this.setState((state) => {
			state.isMyStock = true;
		});
		InteractionManager.runAfterInteractions(function () {
			myStockAction.add({
				code: this.props.code,
				name: this.props.name,
				type: '1',
				symbol: '',
				price: 0,
				yestclose: 0,
			});
		});
	},
	onRemvoe: function (argument) {
		var me = this;
		this.setState((state) => {
			state.isMyStock = false;
		});
		// this.setTimeout(()=>{

		// },100);
		InteractionManager.runAfterInteractions(function () {
			myStockAction.remove(me.props.code);
		});
	},
	getActions: function (argument) {

		var actions = [];
		if (this.state.isMyStock == null)
			return actions;

		if (this.state.isMyStock == false) {
			actions.push(<IconButton key={'add'} onPress={this.onAdd} icon={"fontawesome|plus"} color={"WHITE"} />)
		} else {
			actions.push(<IconButton key={'remove'} onPress={this.onRemvoe} icon={"fontawesome|minus"} color={"WHITE"} />)
		}
		return actions;
	},
	render: function () {
		var price = this.state.price[this.state.cycle];
		if (price.length == 0) {
			return (
				<View style={[this.props.style, styles.container]}>
					<Titlebar showBack={true}></Titlebar>
					<Loading />
				</View>
			);
		}
		return (
			<View style={[this.props.style, styles.container]}>
				<Titlebar showBack={true} title={this.props.name + " " + this.props.code.substring(1)}>
					{this.getActions()}
				</Titlebar>
				<View style={{ flex: 1, overflow: 'hidden' }}>
					<View style={[styles.price]}>
						<PriceInfo code={this.state.code} />
					</View>
					<View style={[styles.chart]}>
						<CycleBar ref={(n) => this._cycleBar = n} onSelect={this.onCycleSelect} />
						<ScrollView ref={(n) => this._scrollView = n} style={styles.kchart}>
							<CandleChart style={styles.candleChart} data={price} />
							<TechChartList style={styles.techChartList} techs={this.state.techCodeList} data={price} />
						</ScrollView>
					</View>
				</View>

			</View>
		);
	}
});

/*<Animated.View style={[styles.price, { top: this.state.priceTop }]}>
					<PriceInfo code={this.state.code} />
				</Animated.View>
				<Animated.View style={[styles.chart, { top: this.state.top }]}>
					<CycleBar ref={(n) => this._cycleBar = n} onSelect={this.onCycleSelect} />
					<ScrollView ref={(n) => this._scrollView = n}  style={styles.kchart}>
						<CandleChart style={styles.candleChart} data={price} />
						<TechChartList style={styles.techChartList} techs={this.state.techCodeList} data={price} />
					</ScrollView>
				</Animated.View>*/

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		shadowRadius: 2,
		shadowColor: 'black',
		shadowOpacity: 0.2,
		shadowOffset: { height: 0.5 },
		elevation: 20
	},
	price: {
		height: 130
	},
	kchart: {
		flex: 1,

	},
	chart: {
		flex: 1,
		// position: 'absolute',
		// left: 0, top: 130, right: 0, bottom: 0,
		// zIndex:6
	},
	candleChart: {
		height: 230
	},
	techChartList: {
		height: 160
	},
	segmentBtn: {
		height: 40,
		backgroundColor: 'red'
	}

});

module.exports = StockDetail;