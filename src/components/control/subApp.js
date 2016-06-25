/* @flow */
'use strict';

var React = require('react-native');
var Titlebar=require('../control/titlebar');
var IconButton=require('../control/button');
var ProgressBar = require('../control/loading');
var {
	StyleSheet,
	View,
	WebView,
	Text,
} = React;
var WEBVIEW_REF = 'webview';
var Component = React.createClass({	
	onRefresh:function (argument) {
		this.refs[WEBVIEW_REF].reload();
	},
	renderLoading:function (argument) {
		return (<ProgressBar/>)
	},
	renderError:function (domain,code,des) {
		return (<View style={styles.loading}><Text>{domain+code+des}</Text></View>)
	},
	render: function() {

		return (
			<View style={styles.container}>
				<Titlebar showBack={true} title={this.props.title} >	
		      		<IconButton key={'refresh'} onPress={this.onRefresh} icon={"fontawesome|refresh"} color={"WHITE"}/>
		        </Titlebar>
			  	<WebView
			      ref={WEBVIEW_REF}
			      renderLoading={this.renderLoading}
			      renderError ={this.renderError}
			      automaticallyAdjustContentInsets={false}
			      style={styles.webView}
			      source={{uri:this.props.url,method:'get'}}
			      javaScriptEnabled={true}
			      onNavigationStateChange={this.onNavigationStateChange}
			      onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
			      startInLoadingState={true}/>
			</View>

		);
	}
});


var styles = StyleSheet.create({
	loading:{ flex:1,justifyContent:'center',alignItems:'center'},
	container:{
		flex:1,
		backgroundColor:'#fff'
	},
	webView:{
		flex:1
	}
});


module.exports = Component;
