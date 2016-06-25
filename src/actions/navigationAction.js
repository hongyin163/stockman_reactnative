var React = require('react-native');
//var TabPanel=require('../components/tabPanel');

var {
  Navigator,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  NativeAppEventEmitter
} = React;

class navigationAction{
	constructor(){
		this._navigator={};
	}
	//{name:'',components:(<obj route={route}>)}
	goto(route){
		NativeAppEventEmitter.emit('route', route);
	}
	back(){
		this._navigator.pop();
	}
	handleRoute(route){
		this._navigator.push(route);
	}
	init(nav){
		this._navigator=nav;
		var me=this;
	   	NativeAppEventEmitter.addListener('route', function (route) {
	   		return me.handleRoute(route);
	   	});
	}
	route(routep, _navigator){
	
		return RouteMap[routep.name];
	}
}

var  RouteMap={
	'main':'TabPanel',
	'stockDetail':'stockDetail'
}
var navAction=new navigationAction();

module.exports=navAction;