'use strict';

import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

var Titlebar=require('../control/titlebar');
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