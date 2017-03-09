/* @flow */
'use strict';


import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView,
	InteractionManager
} from 'react-native';

var Titlebar = require('../control/titlebar');
var IconButton = require('../control/button');
var StockStore = require('../../stores/stockSearchStore');
var StockAction = require('../../actions/myStockAction');
var DataStock = require('../../actions/dataStock');
var {
	ColorConfig,
	PlatformConfig
} = require('../../config');
var {
  BaiduVoise,
	SpeechRecognizer
} = require('react-native-voise');
var { Icon, } = require('react-native-icons');


var Item = React.createClass({
	getInitialState: function () {
		return {
			data: this.props.data
		};
	},
	onRemove: function () {
		StockAction.remove(this.state.data.code);
		var me = this;
		setTimeout(() => {
			me.setState((state, props) => {
				state.data.exist = false;
			});
		}, 10);
	},
	onAdd: function () {
		StockAction.add(this.state.data);
		var me = this;
		setTimeout(() => {
			me.setState((state, props) => {
				state.data.exist = true;
			});
		}, 10);
	},
	getIcons: function () {
		var ibtns = [];
		if (this.state.data.exist) {
			ibtns.push(<IconButton onPress={this.onRemove} icon={"fontawesome|minus"} color={"#000"} />);
		}
		else {
			ibtns.push(<IconButton onPress={this.onAdd} icon={"fontawesome|plus"} color={"#000"} />);
		}
		return ibtns;
	},
	render: function () {
		return (
			<View style={styles.row}>
				<View style={{ flex: 1, padding: 5 }}><Text>{this.state.data.name}</Text></View>
				{this.getIcons()}
			</View>
		);
	}
});



var Add = React.createClass({
	getInitialState: function () {
		return StockStore.getState();
	},
	componentDidMount: function () {
		StockStore.listen(this.onChange);
		var me = this;
		InteractionManager.runAfterInteractions(() => {
			//me._input.focus();
		});
	},
	componentWillUnmount: function () {
		StockStore.unlisten(this.onChange);
	},
	onChange: function (state) {
		this.setState(state);
	},
	getSearchResult: function () {
		var me = this;
		if (this.state.list && this.state.list.map) {
			return this.state.list.map(function (obj) {
				return (<Item key={'item_' + obj.code} data={obj} />)
			});
		}
		return [];
		// var items=[];
		// for (var i = 0; i < 10; i++) {
		// 	items.push(<Item key={'item_'+i} data={{name:i+"",exist:true,code:i+""}}/>);
		// };
		// return items;
	},
	onInputChange: function (input) {

		//this.setState((state)=>state.input=input);
		StockAction.search(input);
	},
	onVoise: function (argument) {
		BaiduVoise.api_key = PlatformConfig.baidu.api_key;;
		BaiduVoise.secret_key = PlatformConfig.baidu.secret_key;
		BaiduVoise.show(function (results) {
			debugger;
		});
	},
	onSearch: function (argument) {
		StockAction.search(this.state.input);
	},
	onReceive: function (results) {
		// this.setState((state)=>{
		//   state.input=results[0];
		// });
		StockAction.search(results[0]);
	},
	render: function () {
		return (
			<View style={styles.container}>
				<Titlebar style={styles.title} showBack={true}>
					<TextInput ref={(n) => this._input = n} onChangeText={this.onInputChange} underlineColorAndroid={'#fff'}
						keyboardType={'default'}
						autoFocus={false} style={styles.input}>{this.state.input}</TextInput>
					<IconButton onPress={this.onSearch} icon={"fontawesome|search"} color={"WHITE"} />
				</Titlebar>
				<ScrollView keyboardShouldPersistTaps={"always"} style={{ flex: 2 }}>
					{this.getSearchResult()}
				</ScrollView>
				<View style={styles.voiseContainer}>
					<BaiduVoise
						ref={'BaiduVoise'}
						style={styles.button}
						api_key={PlatformConfig.baidu.api_key}
						secret_key={PlatformConfig.baidu.secret_key}
						onReceive={this.onReceive}>
						<View style={styles.voiseBtn}>
							<Icon key={"1"} name={"fontawesome|microphone"} size={40} color={"#ffffff"} style={styles.voiseIcon} />
						</View>
					</BaiduVoise>
				</View>
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
		height: 40,
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
	voiseContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	voiseBtn: {
		width: 80,
		height: 80,
		borderRadius: 80,
		backgroundColor: ColorConfig.baseColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	voiseIcon: {
		width: 60,
		height: 60,
		marginLeft: 5,
		marginRight: 5
	}
});


module.exports = Add;

