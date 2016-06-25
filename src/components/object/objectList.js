/* @flow */
'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var StockItem=require('./objectItem');
var StockDetail=require('./objectDetail');
var {
  ToolbarAndroid,
  SwipeRefreshLayout
}=require('react-native-android-lib');
var { Icon, } = require('react-native-icons');
var DataAdapter=require('../chart/techDataAdapter');
var TimerMixin = require('react-timer-mixin');
var Nav=require('../nav');
var {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback,
  InteractionManager,
  PullToRefreshViewAndroid,
  ToastAndroid,
  Dimensions
} = React;
//<ObjectList data={} category={}/>
var ObjectList = React.createClass({
	onSelect:function (data) {
	    Nav.open(<StockDetail name={data.name} code={data.code} type={data.type} cycle={"day"}/>);
	},
	createRows:function(){
		var me = this;
		var list=me.props.data;
		if(list&&list.length>0){
		  	return  list.map(function (obj) {
		    	return (<StockItem key={obj.code} id={obj.code} data={obj} onSelect={me.onSelect}></StockItem>);
		 	});
		}else{
		  	return [];
		}
	}, 
	render: function() {
		return (
		  <View style={styles.container}>
		  	{this.createRows()}
		  </View>
		);
	}
});


var styles = StyleSheet.create({
	container:{
		flex:1
	}
});


module.exports = ObjectList;
