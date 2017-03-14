/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

var { ColorConfig } = require('../../config');

var Loading = React.createClass({
  getInitialState: function () {
    return {
      show: true
    }
  },
  componentDidMount: function () {
    var me = this;
    // setTimeout(() => {
    //   me.setState(function (state) {
    //     state.show = true;
    //   })
    // }, 100);
  },
  render: function () {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={this.state.show} style={[styles.centering, { opacity: this.state.show ? 1.0 : 0.0 }]} size={50} color={ColorConfig.baseColor} />
        <Text>加载中...</Text>
      </View>
    );
  }
});

/**/
var styles = StyleSheet.create({
  centering: {
    height: 50,
    width: 50
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});


module.exports = Loading;
