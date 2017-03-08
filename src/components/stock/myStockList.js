'use strict';
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ToastAndroid,
  AsyncStorage
} from 'react-native';

var myStockStore = require('../../stores/myStocksStore');
var myStockAction = require('../../actions/myStockAction');
var myObjectAction = require('../../actions/objectAction');
var NavAction = require('../../actions/navigationAction');
var StockItem = require('./listItem');
var StockList = require('./stockList');
var ListHeader = require('./listHeader');
var {
  ToolbarAndroid
} = require('react-native-android-lib');
var { Icon, } = require('react-native-icons');
var DataAdapter = require('../chart/techDataAdapter');
var TimerMixin = require('react-timer-mixin');

var scrollView = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    var state = myStockStore.getState();
    // state.sort='asc';
    // state.tech='kdj';
    return state;
  },
  componentDidMount: function () {
    myStockStore.listen(this.onChange);
    var me = this;
    // AsyncStorage.getItem("isFirst")
    // .then((p)=>{
    //     me.downLoadData();
    // })
    // .catch((error) => {
    //     AsyncStorage.setItem('isFirst',false);
    //     me.loadData();
    // });
    me.loadData();

  },
  downLoadData: function (argument) {
    this.setTimeout(() => {
      // myStockAction.downLoad();
      // myObjectAction.downLoad();      
    }, 300);
  },
  loadData: function (argument) {
    var me = this;
    setTimeout(() => {
      me.setLoading(true);
      myStockAction.loadMyStock();
      setTimeout(() => {
        myStockAction.updatePrice(me.state);
        setTimeout(() => {
          myStockAction.updateState(me.state, me.state.tech.code);
          me.setLoading(false);
        }, 500);
      }, 500);
    }, 100);
  },
  componentWillUnmount: function () {
    myStockStore.unlisten(this.onChange);
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
      myStockAction.updatePrice(me.state);
      setTimeout(() => {
        myStockAction.updateState(me.state, me.state.tech.code);
        me.setLoading(false);
      }, 500);
    }, 500);
  },
  onSortByPercent: function (sort) {
    var me = this;
    myStockAction.sort(sort)
  },
  onOpenTech: function () {

    this._techTool.showMenu();

  },
  onTechSelected: function (code) {
    var me = this;
    console.log(code);
    me.setLoading(true);
    this.setTimeout(function (argument) {
      myStockAction.updateState(me.state, code, function (argument) {
        me.setLoading(false);  // body...
      });
    }, 100);
  },
  setLoading: function (isLoading) {
    this._stockList && this._stockList.setRefreshing(isLoading);
  },
  render: function () {
    var stockRows = [];
    if (this.state.errorMessage) {
      stockRows.push(<View key={"placeholder"} style={{ flex: 1 }}></View>);
      //ToastAndroid.show(this.state.errorMessage+"",ToastAndroid.LONG);
    }
    else {
      stockRows.push(<StockList key={'StockList'} ref={(n) => this._stockList = n} onRefresh={this.reloadData} data={this.state.stockList} />)
    }
    return (
      <View style={{ flex: 1 }}>
        <ListHeader tech={{ code: 'T0001', name: 'MACD' }} onSort={this.onSortByPercent} onTechSelected={this.onTechSelected} />
        {stockRows}
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