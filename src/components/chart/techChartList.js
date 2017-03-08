/* @flow */
'use strict';

import React, { Component, PropTypes } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

var TechChart = require('./techChart');


var TechChartList = React.createClass({
	propTypes: {
		techs: PropTypes.array,
		data: PropTypes.array,
	},
	getInitialState: function () {
		return {
			techs: this.props.techs || [],
			data: this.props.data || []
		};		
	},
	getCharts: function (argument) {
		var charts = this.props.techs.map((tech) => {
			debugger;
			return (<TechChart
				key={'techChartList_' + tech.code + parseInt(Math.random() * 10000)}
				ref={'techChart_' + tech.code}
				description={tech.name}
				enableLegend={true}
				style={styles.techChart}
				code={tech.code}
				data={this.props.data} />);
		});
		return charts;
	},
	render: function () {
		return (
			<View style={styles.container}>
				{this.getCharts()}
			</View>
		);
	}
});


var styles = StyleSheet.create({
	container: {

	},
	techChart: {
		height: 120
	}
});


module.exports = TechChartList;