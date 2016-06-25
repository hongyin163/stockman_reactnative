/* @flow */
'use strict';

var React = require('react-native');
var { Icon, } = require('react-native-icons');
var IconButton=require('./control/button');
var Titlebar=require('./control/titlebar');
var Nav=require('./nav');
var StockRecoCross=require('./stock/stockRecoCross');
var StockRecoRank=require('./stock/stockRecoRank');
var StockRecoState=require('./stock/stockRecoState');
var SubApp=require('./control/subApp');
var {
  StyleSheet,
  View,
  IntentAndroid,
  NativeAppEventEmitter
} = React;
var host='http://www.mandata.cn/weixin';
var actions={
	'recommend':'/app/stock/index.html#/list/rank',
	'cross':'/app/stock/index.html#/list/cross',
	'state':'/app/stock/index.html#/list/state',
	'forecast':'/app/stock/view/forecast.html',
	'practice':'/app/stock/view/practice.html'
}
var Component = React.createClass({
	open:function  (url) {
	    // IntentAndroid.canOpenURL(url, (supported) => {
	    //   if (supported) {
	    //     IntentAndroid.openURL(url);
	    //   } else {
	    //     console.log('Don\'t know how to open URI: ' + url);
	    //   }
	   	// });
		NativeAppEventEmitter.emit('subApp',{url:url});  
	},
	onOpenMenu:function (argument) {
		Nav.openMenu()
	},
	setUrl:function(code,title){
		var me=this;
		return function(){
			//me.open(host+actions[code]);
			Nav.open(<SubApp url={host+actions[code]} title={title}/>);
		}

	},
	render: function() {
		return (
		  <View style={styles.container}>
		    <Titlebar >
		      <IconButton  onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"#FFFFFF"}/>
		      <View style={{flex:1}}></View>    
		      <IconButton  onPress={this.onOpenMenu} icon={"fontawesome|search"} color={"#FFFFFF"}/>     
		    </Titlebar>
			<IconButton onPress={()=>Nav.open(<StockRecoRank/>)} style={styles.button} text={"综合推荐"} color={"#000"}  icon={"fontawesome|cube"} />
			<IconButton onPress={()=>Nav.open(<StockRecoCross/>)}  style={styles.button}  text={"最爱金叉"} color={"#000"}  icon={"fontawesome|random"} />
			<IconButton onPress={()=>Nav.open(<StockRecoState/>)}  style={styles.button}  text={"周期反转"} color={"#000"}  icon={"fontawesome|recycle"} />
			<IconButton onPress={this.setUrl('forecast','走势模拟')}  style={styles.button}  text={"走势模拟"} color={"#000"}  icon={"fontawesome|line-chart"} />
			<IconButton onPress={this.setUrl('practice','月光宝盒')}  style={styles.button}  text={"月光宝盒"} color={"#000"}  icon={"fontawesome|inbox"} />
		  </View>
		);
	}
});


var styles = StyleSheet.create({
	container:{
		flex:1,

	},
	button:{
		height:50,
		borderBottomWidth:1,
	    borderBottomColor:'#f3f3f3',
	    alignItems:'center',
	    justifyContent:'flex-start',
	}
});


module.exports = Component;
