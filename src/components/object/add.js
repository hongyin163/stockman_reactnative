/* @flow */
'use strict';
import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView,
	ViewPagerAndroid,
	Dimensions,
	TouchableWithoutFeedback
} from 'react-native';

var Titlebar = require('../control/titlebar');
var IconButton = require('../control/button');
var StockStore = require('../../stores/objectAddStore');
var ObjectAction = require('../../actions/objectAction');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var {ColorConfig} = require('../../config');
var Loading=require('../control/loading');
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var objectData = [{ "code": "0000001", "name": "上证指数", "type": "3", "price": 3612.49, "yestclose": 3636.09, "state": null, "inhand": false, "sort": 0 }, { "code": "0000016", "name": "上证50", "type": "3", "price": 2481.75, "yestclose": 2503.06, "state": null, "inhand": false, "sort": 0 }, { "code": "1399001", "name": "深证成指", "type": "3", "price": 12932.37, "yestclose": 13007.87, "state": null, "inhand": false, "sort": 0 }, { "code": "1399004", "name": "深证100R", "type": "3", "price": 5395.19, "yestclose": 5449.74, "state": null, "inhand": false, "sort": 0 }, { "code": "1399005", "name": "中小板指", "type": "3", "price": 8517.34, "yestclose": 8556.14, "state": null, "inhand": false, "sort": 0 }, { "code": "1399006", "name": "创业板指", "type": "3", "price": 2795.78, "yestclose": 2783.94, "state": null, "inhand": false, "sort": 0 }, { "code": "1399300", "name": "沪深300", "type": "3", "price": 3829.40, "yestclose": 3866.38, "state": null, "inhand": false, "sort": 0 }];
var categoryData = [{ "code": "010100", "name": "银行", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010200", "name": "旅游酒店", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010300", "name": "煤炭", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010400", "name": "石油", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010500", "name": "酿酒食品", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010600", "name": "农业农药", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010700", "name": "商业连锁", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010800", "name": "建材", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "010900", "name": "汽配", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011000", "name": "汽车", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011100", "name": "军工", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011200", "name": "机械制造", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011300", "name": "医药", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011400", "name": "外贸", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011500", "name": "教育传媒", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011600", "name": "仪电仪表", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011700", "name": "有色金属", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011800", "name": "造纸印刷", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "011900", "name": "券商", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012000", "name": "通信", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012100", "name": "运输物流", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012200", "name": "工程建筑", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012300", "name": "电力", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012400", "name": "计算机", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012500", "name": "电子信息", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012600", "name": "房地产", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012700", "name": "纺织服装", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012800", "name": "钢铁", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "012900", "name": "供水供气", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "013000", "name": "化工化纤", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "013100", "name": "电器", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "013200", "name": "交通设施", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "013300", "name": "保险", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "013400", "name": "信托", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }, { "code": "013500", "name": "其他制造业", "type": "2", "price": 0.0, "yestclose": 0.0, "state": null, "inhand": false, "sort": 1 }];
var Item = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data
		}
	},
	onSelect: function () {
		this.setState(function (state) {
			state.data.selected = !state.data.selected;
			setTimeout(function () {
				if (state.data.selected) {
					ObjectAction.add(state.data);
				} else {
					ObjectAction.remove(state.data.code);
				}
			}, 500);
		});

		// this.props.onSelect&&this.props.onSelect(this.state.data.code,this.state.data.name);
	},
	render: function () {
		return (
			<TouchableWithoutFeedback onPress={this.onSelect}>
				<View style={[styles.item, { backgroundColor: this.state.data.selected ? ColorConfig.baseColor : '#d3d3d3' }]}>
					<Text style={{ color: this.state.data.selected ? 'white' : 'black' }}>{this.state.data.name}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
});

var ItemList = React.createClass({
	getInitialState: function () {
		return StockStore.getState()
	},
	componentDidMount: function () {
		StockStore.listen(this.onChange);
	},
	componentWillUnmount: function () {
		StockStore.unlisten(this.onChange);
	},
	onChange: function (store) {
		if (store.data[this.props.cate] == undefined)
			return;
		this.setState(function (state) {
			for (var p in store) {
				state[p] = store[p];
			}
		});
	},
	onSelect: function (code, name) {

		// var data=this.state.data[this.props.cate];
		// for (var i = 0; i < data.length; i++) {
		// 	if(data[i].code==code){
		// 		data[i].selected=!data[i].selected;
		// 		if(data[i].selected){
		// 			ObjectAction.add(data[i]);
		// 		}else{
		// 			ObjectAction.remove(data[i].code);
		// 		}
		// 		break;
		// 	}
		// };
		// this.setState(this.state);
		// var me=this;
		// setTimeout(function (argument) {
		// 	var state=me.state;
		// 	debugger;
		// },5000);
	},
	loadData: function (argument) {
		ObjectAction.loadObjectList(this.props.cate);
	},
	createItems: function (argument) {
		var data = this.state.data[this.props.cate];
		if (!data) return [<Loading/>];

		var items = [];
		for (var i = 0; i < data.length; i++) {
			items.push(<Item key={'cate_' + data[i].code} data={data[i]} onSelect={this.onSelect} />)
		};
		return items;
	},
	render: function () {
		return (
			<ScrollView style={{ flex: 1 }}>
				<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 2 }}>
					{this.createItems()}
				</View>
			</ScrollView>
		);
	}
});

var Add = React.createClass({
	// getInitialState: function() {
	// 	return StockStore.getState();
	// },
	componentDidMount:function(){
		// StockStore.listen(this.onChange);
		this.refs['viewPager_0'].loadData();
	},
	// componentWillUnmount:function(){
	// 	StockStore.unlisten(this.onChange);
	// },  
	// onChange:function(state){ 
	// 	this.setState(state);
	// },
	onPageScroll: function (argument) {
		// body...
	},
	onPageSelected: function (item) {
		this.refs['viewPager_' + item.i].loadData();
	},
	render: function () {
		return (
			<View style={styles.container}>
				<Titlebar style={styles.title} showBack={true} text={'数据'}>
				</Titlebar>
				<ScrollableTabView
					style={styles.container}
					initialPage={0}
					tabBarUnderlineStyle ={{backgroundColor:ColorConfig.baseColor}}
					tabBarActiveTextColor={ColorConfig.baseColor}
					onChangeTab={this.onPageSelected}					
					ref={viewPager => { this._viewPager = viewPager; }}>
					<View tabLabel={"大盘"} style={{ flex: 1 }}>
						<ItemList key={'viewPager_0'} ref={'viewPager_0'} cate={'3'} />
					</View>
					<View tabLabel={"行业"} style={{ flex: 1 }}>
						<ItemList key={'viewPager_1'} ref={'viewPager_1'} cate={'2'} />
					</View>
				</ScrollableTabView >
			</View>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	title: {
		height: 50,
	},
	input: {
		flex: 1,
		padding: 5,
		backgroundColor: '#fff'
	},
	row: {
		flexDirection: 'row',
		//padding: 5,
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9',
		borderRightColor: '#d9d9d9',
		borderRightWidth: 1
	},
	item: { height: 40, width: SCREEN_WIDTH / 3 - 4 - 2, margin: 2, backgroundColor: '#e3e3e3', justifyContent: 'center', alignItems: 'center' }
});


module.exports = Add;

