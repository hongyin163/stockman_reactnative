/* @flow */
'use strict';

import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {ColorConfig} from '../config';
import Titlebar from './control/titlebar';
import IconButton from './control/button';
import MyPostionList from './cloud/myPositionList';
import RecentlyTrades from './cloud/recentlyTrades';
import TradeStrategy from './cloud/tradeStrategy';

import {
	StyleSheet,
	View,
	Text
} from 'react-native';

var Cloud = React.createClass({
	getInitialState: function() {
		return {
			percent:20,
			total:1000000,
			mv:1200000,
			//总资产,
			//总市值
			//盈亏

		};
	},
	render: function() {
		var obj={
			percent:20,
			total:1000000,
			mv:1200000,
			//总资产,
			//总市值
			//盈亏

		};
		return ( 
			<View style={styles.container}>
			    <Titlebar>
				    <IconButton  onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"WHITE"}/>
			    </Titlebar>
				<View style={styles.head}>
					<View style={styles.percent}>
						<Text style={styles.percentText}>{this.state.percent}%</Text>
					</View>					
					<View style={styles.money}>
						<Text style={styles.total}>总资产：{this.state.total}￥</Text>
						<Text style={styles.mv}>总市值：{this.state.mv}￥</Text>
					</View>
				</View>
				<ScrollableTabView 
				 	style={styles.tabView}					
					initialPage={0}
					tabBarUnderlineColor={ColorConfig.baseColor}
					tabBarActiveTextColor={ColorConfig.baseColor}		
					onChangeTab={this.onPageSelected}
					ref={viewPager => { this._viewPager = viewPager; }}>
					<View tabLabel={"持仓"}  style={{flex:1}}>
						<MyPostionList/>
					</View>
		          	<View tabLabel={"最近交易"} style={{flex:1}}>	          	
						<RecentlyTrades/>
					</View>
					<View tabLabel={"策略"} style={{flex:1}}>	          	
						<TradeStrategy/>
					</View>
		        </ScrollableTabView >
		        <View style={{flexDirection:'row', height:50,padding:5}}>
		        	<Text style={{flex:1}}>
		        	注意：提交自选股后，慢牛云端对您的自选股进行监控，按照设定的策略模拟交易，交易仅供参考。
		        	</Text>
		        	 <IconButton  onPress={this.onOpenMenu} icon={"fontawesome|remove"} color={"#e5e5e5"}/>   
		        </View>
			</View>
		);
	}
});


var styles = StyleSheet.create({
	container:{
		flex:1
	},
	head:{
		flex:1,
		backgroundColor:ColorConfig.candle.up
	},
	percent:{
		flex:1,
		justifyContent:'center',
      	alignItems: 'center'
	},
	percentText:{
		fontSize:80,
		color:'white'
	},
	money:{
		flexDirection:'row',
		justifyContent:'space-between',
		padding:3
	},
	total:{
		fontSize:15,
		color:'white'
	},
	mv:{
		fontSize:15,
		color:'white'
	},
	tabView:{
		flex:2
	}
});


module.exports = Cloud;