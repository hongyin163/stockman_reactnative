/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NativeAppEventEmitter
} from 'react-native';


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
