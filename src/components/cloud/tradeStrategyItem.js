'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
var { ColorConfig } = require('../../config');
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;

var Item = React.createClass({
  getInitialState: function (argument) {
    return {
      data: this.props.data
    }
  },
  onSelect: function () {
    var me = this;
    me.setState(function (state) {
      state.data.selected = !state.data.selected;
    }, function () {
      me.props.onSelect && me.props.onSelect(me.state.data);
    });
    // filterAction.select(this.props.name, this.props.index, this.props.multiselect);
  },
  render: function () {
    var selected = this.state.data.selected;
    var data = this.props.data;
    return (
      <TouchableWithoutFeedback onPress={this.onSelect}>
        <View style={[styles.item, { backgroundColor: selected ? ColorConfig.baseColor : '#d3d3d3' }]}>
          <Text style={{ color: selected ? 'white' : 'black' }}>{data.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});


const styles = StyleSheet.create({
  item: {
    width: (SCREEN_WIDTH - 10) / 4 - 2,
    height: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    padding: 15
  }
});

export default Item;