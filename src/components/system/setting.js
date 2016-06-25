'use strict';
var React = require('react-native');
var Titlebar=require('../control/titlebar');
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
var Setting=React.createClass({
	render: function() {
		return (
			<View style={styles.container}>
				<Titlebar showBack={true}  title={"设置"}/>
				<Text>{this.props.name}</Text>
			</View>
		);
	}	
});

module.exports=Setting;