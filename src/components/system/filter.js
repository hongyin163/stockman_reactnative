'use strict';
import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback
} from 'react-native';

var Titlebar = require('../control/titlebar');
var {ColorConfig} = require('../../config');

var filterStore = require('../../stores/filterStore');
var filterAction = require('../../actions/filterAction');

var FilterItem = require('./filterItem');

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});

// var options=[
// 	{
// 		title:'股价(元)',
// 		options:[['0-9999','不限'],['0-20','0-20'],['20-59','20-59'],['50-9999','50以上']]
// 	},
// 	{
// 		title:'市值(亿)',
// 		options:[['0-9999','不限'],['0-100','0-100'],['100-500','100-500'],['500-9999','500以上']]
// 	},
// 	{
// 		title:'市盈率',
// 		options:[['0-9999','不限'],['1-20','1-20'],['20-50','20-50'],['50-9999','50以上']]
// 	},
// 	{
// 		title:'市净率',
// 		options:[['0-9999','不限'],['0-2','0-2'],['2-5','2-5'],['5-9999','5以上']]
// 	}
// ];


// var Item = React.createClass({
// 	getInitialState:function (argument) {
// 		return {
// 			data:this.props.data
// 		}
// 	},
// 	onSelect:function () {	
// 		// debugger;	
// 		// var me=this;
// 		// if(!!me.state.data.selected){
// 		// 	this.state.data['selected']=false;
// 		// }else{
// 		// 	this.state.data['selected']=true;
// 		// }
// 		// this.props.onSelect&&this.props.onSelect(this.props.data,this.props.index);

// 		// this.setState(this.state);
// 		filterAction.select(this.props.name,this.props.index);
// 	},
// 	render: function() {
// 		var selected=this.state.data.selected;

// 		return (
// 			<TouchableWithoutFeedback onPress={this.onSelect}>
// 				<View style={[opstyle.option,{backgroundColor:selected? ColorConfig.baseColor:'#d3d3d3'}]}>
// 					<Text style={{color:selected?'white':'black'}}>{this.props.data[1]}</Text>
// 				</View>
// 			</TouchableWithoutFeedback>
// 		);
// 	}
// });

// var OptionItem=React.createClass({
// 	getInitialState:function (argument) {
// 		return {
// 			data:this.props.data
// 		}
// 	},
// 	onSelect:function (data,index) {
// 		this.props.onSelect&&this.props.onSelect(data,index);
// 	},
// 	render: function() {
// 		var me=this;
// 		var optionRows=this.state.data.options.map((data,i)=>{
// 			return <Item data={data} name={me.props.name} index={i} onSelect={me.onSelect}/>
// 		});
// 		return (
// 			<View style={opstyle.container}>
// 				<View style={opstyle.titleContainer}>
// 					<Text style={opstyle.title}>{this.state.data.title}</Text>
// 				</View>
// 				<View style={opstyle.opcontainer}>
// 					{optionRows}
// 				</View>
// 			</View>
// 		);
// 	}	
// });


// var opstyle=StyleSheet.create({
// 	container:{
// 		flex:1,
// 		padding:5,
// 		backgroundColor:'#fff'
// 	},
// 	titleContainer:{
// 		padding:5,
// 	},
// 	title:{
// 		fontSize:20,
// 		// paddingBottom:5,
// 		// backgroundColor:'red'
// 	},
// 	opcontainer:{
// 		flexDirection:'row', flex:1, 
// 		justifyContent :'center',
// 		alignItems: 'center',
// 	},
// 	option:{
// 		flex:1,
// 		backgroundColor:'#f5f5f5',
// 		justifyContent :'center',
// 		alignItems: 'center',
// 		margin:1,
// 		padding:15
// 	},
// 	optionText:{
// 		fontSize:15
// 	}
// });

var Filter = React.createClass({
	getInitialState: function (argument) {
		return filterStore.getState();
	},
	componentDidMount: function () {
		filterStore.listen(this.onChange);
		filterAction.load();
	},
	componentWillUnmount: function () {
		filterStore.unlisten(this.onChange);
	},
	onChange: function (state) {
		this.setState(state);
	},
	onSelect: function (argument) {
		this.setState(this.state);
	},
	getOptionRows: function (argument) {
		var me = this;
		var data = this.state.data;
		var rows = [];
		for (var pro in data) {
			rows.push(<FilterItem key={'filter_' + pro} data={data[pro]} name={pro} onSelect={me.onSelect} />)
		}
		return rows;
	},
	onSave: function (argument) {
		filterAction.save(this.state.getValues());
	},
	render: function () {
		return (
			<View style={styles.container}>
				<Titlebar showBack={true} title={"数据过滤"} onBack={this.onSave} />
				<View>
					{this.getOptionRows()}
				</View>
			</View>
		);
	}
});

module.exports = Filter;