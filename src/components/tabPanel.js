import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Dimensions,
	Text
} from 'react-native';

import { Icon, } from 'react-native-icons';

var TabButton = require('./tabButton');
var Main = require('./main');
var Cycle = require('./cycle');
var navAction = require('../actions/navigationAction');
var Discovery = require('./discovery');
var TimerMixin = require('react-timer-mixin');
var Cloud = require('./cloud');
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var SCENE_DISABLED_NATIVE_PROPS = {
	pointerEvents: 'none',
	style: {
		top: SCREEN_HEIGHT,
		bottom: -SCREEN_HEIGHT,
		opacity: 0,
	},
};
var SCENE_ENABLED_NATIVE_PROPS = {
	pointerEvents: 'auto',
	style: {
		top: 0,
		bottom: 0,
		opacity: 1
	},
};

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	tabBar: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		backgroundColor: '#f5f5f5'
	},
	tabButton: {
		flex: 1
	},
	tabContent: {
		flex: 1
	},
	tabItem: {
		position: 'absolute',
		width: SCREEN_WIDTH,
		top: 0,
		bottom: 0
	},
	tabItemHide: {
		position: 'absolute',
		width: SCREEN_WIDTH,
		top: SCREEN_HEIGHT,
		bottom: -SCREEN_HEIGHT,
		opacity: 0,
	}
});
var childernforEach = React.Children.forEach;

var TabPanel = React.createClass({
	mixins: [TimerMixin],
	getInitialState: function () {
		var refList = ['mystocks', 'cycle', 'discovery', 'cloud'];
		var state = {};
		refList.forEach((name) => {
			state[name] = {};
			state[name]['visible'] = false;
		})
		return {
			...state,
			selected: 'mystocks',
		};
	},
	getTabContent: function (argument) {
		// body...
	},
	cycle: [],
	onTabSelect: function (name) {
		var me = this;
		var refList = ['mystocks', 'cycle', 'discovery', 'cloud'];
		return function () {
			var state = me.state;

			var lastVisible = state[name].visible;
			refList.forEach((pro) => {
				if (pro == name) {
					me.refs[pro].setNativeProps(SCENE_ENABLED_NATIVE_PROPS);
					me.refs['tab_' + pro].setColor('#c00')
					state[pro].visible = true;

				} else {
					me.refs[pro].setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
					me.refs['tab_' + pro].setColor('#d0d0d0')
				}
			});
			if (state[name].visible != lastVisible) {
				me.setTimeout(() => {
					me.setState(state);
				}, 10);
			}
		}
	},
	render: function () {
		var grayColor = '#d0d0d0', focusColor = '#cc0000';
		return (
			<View style={styles.container}>
				<View style={styles.tabContent}>
					<View style={styles.tabItem} ref="mystocks">
						<Main ref={'inner_mystocks'} name={"main"} />
					</View>
					<View style={styles.tabItemHide} ref="cycle">
						<Cycle visible={this.state['cycle'].visible} />
					</View>
					<View style={styles.tabItemHide} ref="discovery">
						<Discovery visible={this.state['discovery'].visible} />
					</View>
					<View style={styles.tabItemHide} ref="cloud">
						<Cloud visible={this.state['cloud'].visible} />
					</View>
				</View>
				<View style={styles.tabBar}>
					<TabButton ref={'tab_mystocks'} icon='fontawesome|home' style={styles.tabButton}
						color={focusColor}
						text="首页"
						onPress={this.onTabSelect('mystocks')} />
					<TabButton ref={'tab_cycle'} icon='fontawesome|clock-o' style={styles.tabButton}
						color={grayColor}
						text="周期"
						onPress={this.onTabSelect('cycle')} />
					<TabButton ref={'tab_discovery'} icon='fontawesome|eye' style={styles.tabButton}
						color={grayColor}
						text="发现"
						onPress={this.onTabSelect('discovery')} />
					<TabButton ref={'tab_cloud'} icon='fontawesome|cloud' style={styles.tabButton}
						color={grayColor}
						text="我的云控"
						onPress={this.onTabSelect('cloud')} />
				</View>
			</View>
		);
	}
});

//<Discovery visible={this.state['discovery'].visible} />

//<Cycle visible={this.state['cycle'].visible} />

//<Cloud visible={this.state['cloud'].visible} />

module.exports = TabPanel;