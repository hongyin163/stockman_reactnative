
'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';

var Titlebar = require('../control/titlebar');
var { ColorConfig } = require('../../config');

var filterStore = require('../../stores/filterStore');
var filterAction = require('../../actions/filterAction');

var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;

var Item = React.createClass({
	getInitialState: function (argument) {
		return {
			data: this.props.data
		}
	},
	onSelect: function () {
		// debugger;	
		// var me=this;
		// if(!!me.state.data.selected){
		// 	this.state.data['selected']=false;
		// }else{
		// 	this.state.data['selected']=true;
		// }
		// this.props.onSelect&&this.props.onSelect(this.props.data,this.props.index);

		// this.setState(this.state);
		filterAction.select(this.props.name, this.props.index, this.props.multiselect);
	},
	render: function () {
		var selected = this.state.data.selected;

		return (
			<TouchableWithoutFeedback onPress={this.onSelect}>
				<View style={[opstyle.option, { backgroundColor: selected ? ColorConfig.baseColor : '#d3d3d3' }]}>
					<Text style={{ color: selected ? 'white' : 'black' }}>{this.props.data[1]}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
});

var OptionItem = React.createClass({
	getDefaultProps: function (argument) {
		return {
			multiselect: false
		}
	},
	getInitialState: function (argument) {
		return {
			data: this.props.data
		}
	},
	onSelect: function (data, index) {
		this.props.onSelect && this.props.onSelect(data, index);
	},
	render: function () {
		var me = this;
		var optionRows = me.state.data.options.map((data, i) => {
			return <Item key={'filteritem_' + me.state.data.name + '_' + i} data={data} multiselect={me.state.data.multiselect ? true : false} name={me.props.name} index={i} onSelect={me.onSelect} />
		});

		return (
			<View style={opstyle.container}>
				<View style={opstyle.titleContainer}>
					<Text style={opstyle.title}>{this.state.data.title}</Text>
				</View>
				<View style={opstyle.opcontainer}>
					{optionRows}
				</View>
			</View>
		);
	}
});


var opstyle = StyleSheet.create({
	container: {
		padding: 5,
		backgroundColor: '#fff'
	},
	titleContainer: {
		padding: 5,
	},
	title: {
		fontSize: 20,
		// paddingBottom:5,
		// backgroundColor:'red'
	},
	opcontainer: {
		flexDirection: 'row', flexWrap: 'wrap'
		// justifyContent :'center',
		// alignItems: 'center',
	},
	option: {
		width: (SCREEN_WIDTH - 10) / 4 - 2,
		height:50,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 1,
		padding: 15
	},
	optionText: {
		fontSize: 15
	}
});

module.exports = OptionItem;