/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

var {ColorConfig}=require('../../config');
var techStore = require('../../stores/techStore');
var techAction =require('../../actions/techAction');
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
	getDefaultProps: function() {
		return {
			includeVol:true
		};
	},
	componentDidMount:function(){
		techStore.listen(this.onChange);
		var me=this;
		setTimeout(function(){
				techAction.loadTechData();

		},100)		
	},
	componentWillUnmount:function(){
		techStore.unlisten(this.onChange);
	}, 
	onChange:function(state) {		
		// var techList= state.techs;
		// var techObj={};
		// // if(this.props.includeVol)
		// // 	techObj={vol:{name:'vol'}};

		// for (var i = 0; i < techList.length; i++) {
		// 	techObj[techList[i].code]={name:techList[i].name};
		// };
		// var first='vol';
		// if(this.props.includeVol==true){
		// 	first='vol';
		// 	techObj['vol']={name:'vol'};
		// }else{
		// 	first=techList[0].code;
		// }
		// this.setState({
		// 	pressed:first,
		// 	techs:techObj,
		// 	techList=
		// });
		var techList=[],techs=state.techs;

		for (var i = 0; i < techs.length; i++) {			
			techList.push({
				code:techs[i].code,
				name:techs[i].name
			})
		};
		var first='vol';
		if(this.props.includeVol==true){
			first='vol';
			techList.push({
				code:'vol',
				name:'vol'
			});
		}else{
			first=techList[0].code;
		}
		this.setState({
			pressed:first,
			techList:techList
		});
	}, 
	getInitialState:function (argument) {		
		return {
			techList:[],
			pressed:''
		};
	},
	createTechBtn:function (argument) {
		var btns=[];
		// var techs=this.state.techs;
		// for(var pro in techs){
		// 	var tech=techs[pro];
		// 	var pressed=this.state.pressed==pro;
		// 	//console.log(pro);
		// 	btns.push(<TechBtn key={pro} pressed={pressed} ref={"btn_"+pro} code={pro} text={tech.name} onPress={this.handlePress}/>);
		
		// }

		var techs=this.state.techList;

		techs.forEach((tech,i)=>{
			var pressed=this.state.pressed==tech.code;
			//console.log(pro);
			btns.push(<TechBtn key={'techBar_'+tech.code} pressed={pressed} ref={"btn_"+tech.code} code={tech.code} text={tech.name} onPress={this.handlePress}/>);

		});
		return btns;
	},
	handlePress:function(code,name){
		var me=this;
		this.state.pressed=code;
		
		var techs=this.state.techList;
		techs.forEach((tech,i)=>{
			if(tech.code!=code)
				this.refs["btn_"+tech.code].setPressState(false);
			else
				this.refs["btn_"+tech.code].setPressState(true);
		});
		
		me.setTimeout(()=>{
			if(me.props.onSelect)
				me.props.onSelect(code,name);
		},10);
	},
	next:function () {
		var me=this;
		var pressedCode=me.state.pressed;
		var techs=me.state.techList;
		var next=0,flag=false,fistCode='';
		techs.forEach((tech,i)=>{
			if(tech.code==pressedCode){
				if(i<techs.length-1){
					next=i+1;
				}else{
					next=0;
				}
			}
		});
		me.handlePress(techs[next].code,techs[next].name);
	},
	render: function() {
		return (
		  <View style={[styles.container,this.props.style]}>
		  	{this.createTechBtn()}
		  </View>
		);
	}
});


var styles = StyleSheet.create({
	container:{
		flex:1,
		 //flexDirection:'row',
		//backgroundColor:'red'
		flexDirection:'row',
		padding:5,
		backgroundColor:'#F3F3F3',
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
