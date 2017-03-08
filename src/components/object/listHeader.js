/* @flow */
'use strict';

import React, { Component,PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback
} from 'react-native';

var DataAdapter=require('../chart/techDataAdapter');
var { Icon, } = require('react-native-icons');

var {
  ToolbarAndroid,
  // SwipeRefreshLayout
}=require('react-native-android-lib');
var ListHeader = React.createClass({
	getInitialState: function() {
		return {
			tech:this.props.tech,
			sort:'',
			techList:this.getTechToolList()
		};
	},
	getTechToolList:function (argument) {
	    var techLibs=DataAdapter.getAll();
	    var techs=[];
	    for(var pro in techLibs){
	      techs.push({title:techLibs[pro].name,code:pro});
	    }
	    return techs;
	},
	getSortIcon:function (argument) {
		var me=this;
		var cmp=[];
		if(me.state.sort=='asc'){
		  cmp.push(<Icon key={"asc"} name={'fontawesome|sort-amount-asc'} size={15}  color={'#d9d9d9'}  style={{width:15,height:15}}/>) ;
		}else if(me.state.sort=='desc'){
		  cmp.push(<Icon key={"asc"}  name={'fontawesome|sort-amount-desc'} size={15}  color={'#d9d9d9'}  style={{width:15,height:15}}/>) ;
		}
		return cmp;
	},
	onSortByPercent:function(){
	    var me=this;
	    var sort='';
	    if(me.state.sort=='asc'){
	      sort='desc';
	    }else  if(me.state.sort=='desc'){
	      sort='';
	    }else  if(me.state.sort==''){
	      sort='asc';
	    }
	    me.setState((state,props)=>{
	    	state.sort=sort;
	    });
	    this.props.onSort&&this.props.onSort(sort);
  	},
	onOpenTech:function(){
		this._techTool.showMenu();
	},  
	onTechSelected:function (index) {
		var me=this;
		var obj=me.state.techList[index];
		me.setState((state,props)=>{
	    	state.tech.code=obj.code;
	    	state.tech.name=obj.title;
	    });
		me.props.onTechSelected&&me.props.onTechSelected(obj.code,obj.title);
	},
	render: function() {
	    return (
	      	<View style={{flexDirection: 'row',height:35,backgroundColor:'#f5f5f5' }}>
	       
						<View style={styles.head}><Text style={styles.headText}>名称</Text></View>
						<View style={styles.head}><Text style={styles.headText}>价格</Text></View>
						<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
														onPress={this.onSortByPercent}>
									<View style={styles.head}>
										<Text style={styles.headText}>涨跌</Text>
										{this.getSortIcon()}                
									</View>   
								</TouchableNativeFeedback>
								<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
										onPress={this.onOpenTech}>    
									<View style={styles.head}>
										<Text style={styles.headText}>{this.state.tech.name}</Text>
										<ToolbarAndroid ref={(contrl)=>this._techTool=contrl} 
															actions={this.state.techList} 
															style={{width:5,height:35,opacity:0}}
															onActionSelected={this.onTechSelected} />
									</View>
						</TouchableNativeFeedback>      
	         
	        </View>
	    );
	  }
	});

var styles = StyleSheet.create({
	head:{flexDirection:'row', flex:1, justifyContent :'center',alignItems: 'center',},
  	headText:{fontSize:15},
});


module.exports = ListHeader;
