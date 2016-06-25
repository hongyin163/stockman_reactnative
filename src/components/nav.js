/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  NativeAppEventEmitter
} = React;

class Nav {
	constructor(){
		// NativeAppEventEmitter.addListener('nav', this.onNav);
	}
	regist(navigator){
		this.navigator=navigator;
	}
	open(page){
		//this.navigator.push({name:data.name,component:React.createElement(data.component,data.props)})
		this.navigator.push({name:'',component:page});
	}
	back(){
		this.navigator.pop();
	}
	openMenu(){		
    	NativeAppEventEmitter.emit('openMenu');
	}
}

module.exports = new Nav();
