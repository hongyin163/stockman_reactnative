'use strict';


import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  Dimensions
} from 'react-native';

var myObjectStore = require('../../stores/myObjectStore');
var myObjectAction = require('../../actions/objectAction');
//var TextButton=require('../button');
//var myStockAction=require('../../actions/myStockAction');
var NavAction = require('../../actions/navigationAction');
var StockItem = require('./objectItem');
var ListHeader = require('./listHeader');
var ObjectList = require('./objectList');
var {
  ToolbarAndroid
} = require('react-native-android-lib');
var { Icon, } = require('react-native-icons');
var DataAdapter = require('../chart/techDataAdapter');
var TimerMixin = require('react-timer-mixin');
var {ColorConfig} = require('../../config');
var PullToRefreshView = require('../control/pullToRefresh');

var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;


var scrollView = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    var state = myObjectStore.getState();
    // state.sort='asc';
    // state.tech='kdj';
    return state;
  },
  componentDidMount: function () {
    myObjectStore.listen(this.onChange);
    var me = this;
    debugger;
    setTimeout(() => {
      me.setLoading(true);
      myObjectAction.loadMyObjects();
      setTimeout(()=>{
          myObjectAction.updatePrice(me.state);
            setTimeout(()=>{
                myObjectAction.updateState(me.state,me.state.tech.code);
                setTimeout(()=>{
                    myObjectAction.loadRecoCateCount(me.state);
                    me.setLoading(false);

                },500);     
            },500);          
      },500);
    }, 100);
  },
  componentWillUnmount: function () {
    myObjectStore.unlisten(this.onChange);
  },
  onChange: function (store) {
    this.setState(function (state) {
      for (var p in store) {
        state[p] = store[p];
      }
    });
  },
  reloadData: function () {
    var me = this;
    me.setLoading(true);
    setTimeout(() => {
      myObjectAction.updatePrice(me.state);
      setTimeout(() => {
        myObjectAction.updateState(me.state, me.state.tech.code);
        me.setLoading(false);
      }, 500);
    }, 500);
  },
  onSortByPercent: function (sort) {
    myObjectAction.sort(sort)
  },
  onTechSelected: function (code, name) {
    var me = this;
    me.setLoading(true);
    this.setTimeout(function (argument) {
      myObjectAction.updateState(me.state, code, function (argument) {
        me.setLoading(false);  // body...
      });
    }, 100);
  },
  setLoading: function (isLoading) {
    // this._refresh.getInnerViewNode().setNativeProps({
    //   refreshing:isLoading
    // });
    this._refresh && this._refresh.setRefreshing(isLoading);
  },
  render: function () {
    var stockRows = [];
    if (this.state.errorMessage) {
      stockRows.push(<View key={"placeholder"} style={{ flex: 1 }}></View>);
      //ToastAndroid.show(this.state.errorMessage,ToastAndroid.LONG);
    }
    // else if(this.state.isLoading==true){
    //   stockRows=[];
    // }
    else {
      stockRows.push(<ObjectList key={'ObjectList'} data={this.state.list} />);
    }
    return (
      <View style={{ flex: 1 }}>
        <ListHeader tech={{ code: 'T0001', name: 'MACD' }} onSort={this.onSortByPercent} onTechSelected={this.onTechSelected} />
        <PullToRefreshView
          style={styles.scrollView}
          ref={(control) => this._refresh = control}
          onRefresh={this.reloadData}>
          <ScrollView style={{ flex: 1 }}>
            {stockRows}
          </ScrollView>
        </PullToRefreshView>
      </View>

    );
  }

});

var styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  head: { flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', },
  headText: { fontSize: 15 },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },

  delete: {

  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});

module.exports = scrollView;