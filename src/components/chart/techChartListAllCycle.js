/* @flow */
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text
} from 'react-native';

var TechChart = require('./techChart');
var TechBar = require('./techBar');

var TechChartList = React.createClass({
  propTypes: {
    code: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  },
  getDefaultProps: function () {
    var state = {
      code: '',
      name: '',
      data: { 'day': [], 'week': [], 'month': [] },
    };
    return state;
  },
  onPress: function (argument) {
    this.props.onPress && this.props.onPress(this.props.code, this.props.name);
  },
  render: function () {
    var charts = [];
    var cycle = { 'day': '日', 'week': '周', 'month': '月', };
    var price = this.props.data;
    for (var pro in price) {
      var data = price[pro];
      if (data.length == 0) { continue; }
      if (pro == 'month')
        charts.push(<TechChart key={'tech_' + pro} ref={'tech_' + pro} description={cycle[pro]} style={styles.techChart} enableLegend={true} code={this.props.code} data={data} />);
      else
        charts.push(<TechChart key={'tech_' + pro} ref={'tech_' + pro} description={cycle[pro]} style={styles.techChart} code={this.props.code} data={data} />);
    }
    var childs = [];
    if (this.props.data.day.length > 0) {
      if (this.props.title) {
        childs.push(<View style={styles.title}><Text>{this.props.title}</Text></View>);
      }
      childs = childs.concat(charts);//.push(<View key={'Charts'}  style={styles.container}>{charts}</View> );
    } else {
      childs.push(<View key={'Loading'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>加载中...</Text></View>)
    }
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.container}>
          {childs}
        </View>
      </TouchableWithoutFeedback>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    height: 240
  },
  title: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start', alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#ffffff'
  },
  techChart: {
    flex: 1
  },
});


module.exports = TechChartList;
