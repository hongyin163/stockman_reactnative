'use strict';
var React = require('react-native');
var Titlebar=require('../control/titlebar');
var Button=require('../control/button');
var {
  DevUtil
}=require('react-native-android-lib');

var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;
var styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff'
	}
});
var Component=React.createClass({
	showDevMenu:function (argument) {
		DevUtil.ShowDevMenu();
	},
	render: function() {
		var text='慢牛是一款个性化股票投资类APP，为用户提供免费的指数形态计算，帮助用户更好控制交易时机。\n\n' +
        '慢牛力图从用户关注的数据中寻找机会，从用户关注的个股中寻找好的交易时间点，从用户关注的行业中寻找好的技术形态的个股。\n\n' +
        '慢牛科技成立于2014年8月，是一家致力于利用互联网和大数据技术为广大投资者提供服务的公司，专注股票投资领域。 慢牛希望帮助每一位投资者抓住机会，帮助每一位投资者成长。\n\n' +
        //'</p>慢牛官网：<a hreft="http://www.mandata.cn" target="_blank">http://www.mandata.cn</a></br>'+
        '微信公众号：慢牛股票\n新浪微博：@慢牛基因\nQQ讨论群：71602646 ' 
		return (
			<View style={styles.container}>
				<Titlebar showBack={true} title={"关于我们"}/>
				<View style={{flex:1,padding:15}}>
					<Text>{text}</Text>
				</View>		
          		<Button text={"开发菜单"} color={"#6EB244"}  icon={"fontawesome|list"}   onPress={this.showDevMenu}/>

			</View>
		);
	}	
});

module.exports=Component;