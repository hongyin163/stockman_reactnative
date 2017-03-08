/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native';

var {ColorConfig}=require('../../config');
var TimerMixin = require('react-timer-mixin');

var TechBtn=React.createClass({
	getInitialState:function (argument) {
	    return {
          pressed:this.props.pressed
	    };
	},
	onPressButton:function (argument) {
		//console.log(this.props.text)
		if(this.props.onPress)
			this.props.onPress(this.props.code,this.props.text);
		this.setState({pressed:true});
	},
	getPressStyle:function () {			
		if(this.state.pressed==true){
			return styles.techBtnItemFocus;
		}else{
			return styles.techBtnItem;
		}
	},
	getTextStyle:function(){
		if(this.state.pressed==true){
			return styles.techBtnTextFocus;
		}else{
			return styles.techBtnText;
		}
	},
	setPressState:function (pressed) {	
		if(this.state.pressed!=pressed)		
			this.setState({pressed:pressed});
	},
	getPressState:function () {	
		return this.state.pressed;
	},
	render:function(){
		return (
			<TouchableNativeFeedback
		    onPress={this.onPressButton}
		    background={TouchableNativeFeedback.SelectableBackground()}>
			  <View style={this.getPressStyle()}>
			    <Text style={this.getTextStyle()}>{this.props.text}</Text>
			  </View>
			</TouchableNativeFeedback>
		);
	}
});


var TechBar = React.createClass({
	mixins: [TimerMixin],
	propTypes: {
	    onSelect:React.PropTypes.func
	},
	getInitialState:function (argument) {		
		//var techList= techStore.getState();
		var techObj={
			day:{code:'day',name:'日'},
			week:{code:'week',name:'周'},
			month:{code:'month',name:'月'}
		};
		// for (var i = 0; i < techList.length; i++) {
		// 	techObj[techList[i].code]={name:techList[i].name};
		// };
		var cycleList=[
			{code:'day',name:'日'},
			{code:'week',name:'周'},
			{code:'month',name:'月'}
		];
		return {
			techs:techObj,
			pressed:'day',
			cycleList:cycleList
		};
	},
	createTechBtn:function (argument) {
		var btns=[];
		// var techs=this.state.techs;
		// for(var pro in techs){
		// 	var tech=techs[pro];
		// 	var pressed=this.state.pressed==pro;
		// 	console.log(pro);
		// 	btns.push(<TechBtn key={pro} pressed={pressed} ref={"btn_"+pro} code={pro} text={tech.name} onPress={this.handlePress}/>);
		
		// }
		var cycles=this.state.cycleList;
		cycles.forEach((cycle,i)=>{
			var pressed=this.state.pressed==cycle.code;
			btns.push(<TechBtn key={'cycleBar_'+cycle.code} 
				pressed={pressed} 
				ref={"btn_"+cycle.code} 
				code={cycle.code} 
				text={cycle.name} onPress={this.handlePress}/>);

		});
		return btns;
	},
	handlePress:function(code,name){
		var me=this;
		me.state.pressed=code;
		var cycles=me.state.cycleList;
		cycles.forEach((cycle,i)=>{
			if(cycle.code!=code)
				me.refs["btn_"+cycle.code].setPressState(false);
			else
				me.refs["btn_"+cycle.code].setPressState(true);
		});
		me.setTimeout(()=>{
			if(me.props.onSelect)
				me.props.onSelect(code,name);
		});
	},
	next:function () {
		var me=this;
		var pressedCode=me.state.pressed;
		var items=me.state.cycleList;
		var next=0,flag=false,fistCode='';
		items.forEach((tech,i)=>{
			if(tech.code==pressedCode){
				if(i<items.length-1){
					next=i+1;
				}else{
					next=0;
				}
			}
		});
		me.handlePress(items[next].code,items[next].name);
	},
	render: function() {
		//var t=this.state.techs;
		
		return (
		  <View style={[styles.container,this.props.style]}>
		  	{this.createTechBtn()}
		  </View>
		);
	}
});


var styles = StyleSheet.create({
	container:{
		flexDirection:'row',
		padding:5,
		backgroundColor:'#F3F3F3',
		height:40
	},
	techBtnItem:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		marginRight:1,
		borderRadius:5,
		backgroundColor:'#F3F3F3',
	},
	techBtnItemFocus:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:ColorConfig.segmentBtn.focus,
		marginRight:1,
		borderRadius:5
	},
	techBtnText:{
		color:"black"
	},
	techBtnTextFocus:{
		color:"white"
	}
});


module.exports = TechBar;
