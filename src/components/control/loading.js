/* @flow */
'use strict';

var React = require('react-native');
var ProgressBar = require('ProgressBarAndroid');
var {ColorConfig}=require('../../config');
var {
  StyleSheet,
  View,
  Text
} = React;

var Component = React.createClass({
  render: function() {
    return (
      	<View style={styles.loading}>
			<ProgressBar style={{width:50,height:50}} color={ColorConfig.baseColor}/>
			<Text>加载中...</Text>
		</View>
    );
  }
});


var styles = StyleSheet.create({
	loading:{ flex:1,justifyContent:'center',alignItems:'center'},
});


module.exports = Component;
