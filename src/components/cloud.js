/* @flow */
'use strict';

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ColorConfig } from '../config';
import Titlebar from './control/titlebar';
import IconButton from './control/button';
import Nav from './nav';
import MyPostionList from './cloud/myPositionList';
import MyAccount from './cloud/myAccount';
import RecentlyTrades from './cloud/recentlyTrades';
import TradeStrategy from './cloud/tradeStrategy';
import CloudAction from '../actions/cloudAction';
import Loading from './control/loading';

var Cloud = React.createClass({
	getInitialState: function () {
		return {

		};
	},
	onOpenMenu: function (argument) {
		Nav.openMenu()
	},
	render: function () {
		var childs = [];
		if (!this.props.visible) {
			return (
				<View style={styles.container}>
					<Titlebar>
						<IconButton onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"#ffffff"} />
					</Titlebar>
					<Loading key="cloud_loading" />
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Titlebar>
					<IconButton onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"#ffffff"} />
				</Titlebar>
				<MyAccount />
				<ScrollableTabView
					style={styles.tabView}
					initialPage={0}
					tabBarUnderlineColor={ColorConfig.baseColor}
					tabBarActiveTextColor={ColorConfig.baseColor}
					onChangeTab={this.onPageSelected}
					ref={viewPager => { this._viewPager = viewPager; }}>
					<View tabLabel={"持仓"} style={{ flex: 1 }}>
						<MyPostionList key={'MyPostionList'} />
						<View style={{ flexDirection: 'row', height: 50, padding: 5 }}>
							<Text style={{ flex: 1 }}>
								注意：提交自选股后，慢牛云端对您的自选股进行监控，按照设定的策略模拟交易，交易仅供参考。
		        			</Text>
							<IconButton onPress={this.onOpenMenu} icon={"fontawesome|remove"} color={"#e5e5e5"} />
						</View>
					</View>
					<View tabLabel={"最近交易"} style={{ flex: 1 }}>
						<RecentlyTrades />
					</View>
					<View tabLabel={"策略"} style={{ flex: 1 }}>
						<TradeStrategy />
					</View>
				</ScrollableTabView >

			</View>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	tabView: {
		flex: 3
	}
});


module.exports = Cloud;