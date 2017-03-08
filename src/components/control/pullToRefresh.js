/* @flow */
'use strict';

import React, { Component } from 'react';
import {
	RefreshControl
} from 'react-native';

var {ColorConfig} = require('../../config');

var PullToRefresh = React.createClass({
	setRefreshing: function (isLoading) {
		// this._refresh && this._refresh.getInnerViewNode().setNativeProps({ refreshing: isLoading });
	},
	render: function () {
		return (
			<RefreshControl				
				ref={(control) => this._refresh = control}
				refreshing={false}
				style={this.props.style}
				colors={[ColorConfig.baseColor]}
				progressBackgroundColor={'#ffffff'}
				onRefresh={() => { this.props.onRefresh && this.props.onRefresh() }}>
				{this.props.children}
			</RefreshControl>
		);
	}
});

module.exports = PullToRefresh;