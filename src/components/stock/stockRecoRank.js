'use strict';

import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  InteractionManager,
  ToastAndroid,
  ListView
} from 'react-native';

var myStockStore = require('../../stores/stockRecoRankStore');
var myStockAction = require('../../actions/recoAction');
var NavAction = require('../../actions/navigationAction');
var StockList = require('./stockList');
var ListHeader = require('./listHeader');
var StockItem = require('./editItem');
var StockDetail = require('./stockDetail');
var CycleBar = require('../chart/cycleBar');
var {
  ToolbarAndroid
} = require('react-native-android-lib');
var { Icon, } = require('react-native-icons');
var TimerMixin = require('react-timer-mixin');
var Titlebar = require('../control/titlebar');
var RefreshListView = require('../control/refreshListView');
var Nav = require('../nav');

var scrollView = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return myStockStore.getState();
  },
  componentDidMount: function () {
    myStockStore.listen(this.onChange);
    var me = this;
    InteractionManager.runAfterInteractions(() => {
      me.setLoading(true);
      myStockAction.loadRecoRankStock();
      me.setLoading(false);
    });
    // setTimeout(()=>{     

    //     // setTimeout(()=>{
    //     //     myStockAction.updatePrice(me.state);
    //     //       setTimeout(()=>{
    //     //           myStockAction.updateState(me.state,me.state.tech.code);
    //     //           me.setLoading(false);
    //     //       },500);          
    //     // },500);
    // },1000);    
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
  getActions: function (data) {
    var actions = [
      {
        title: '添加自选',
        width: 80
      }
    ];
    return actions;
  },
  onActionSelect: function (action, data) {
    var me = this;
    if (action.title == '添加自选') {
      myStockAction.add(data);
    }
  },
  onSelect: function (data) {
    Nav.open(<StockDetail name={data.name} code={data.code} cycle={"day"} />);
  },
  renderRow: function (obj) {
    var me = this;
    return (<StockItem key={obj.code} id={obj.code} data={obj}
      actions={me.getActions(obj)}
      onActionSelect={me.onActionSelect}
      onSelect={this.onSelect} />);
  },
  renderSectionHeader: function (sectionData: string, sectionID: string) {
    return (
      <View style={styles.sectionHeader}>
        <Text>
          {sectionData}
        </Text>
      </View>
    );
  },
  reloadData: function () {
    var me = this;
    me.setLoading(true);
    setTimeout(() => {
      myStockAction.updatePrice(me.state);
      me.setLoading(false);
    }, 500);
  },
  setLoading: function (isLoading) {
    this._stockList && this._stockList.setRefreshing(isLoading);
  },
  getDataSrouce: function (argument) {
    var getSectionData = (dataBlob, sectionID) => {
      return dataBlob[sectionID];
    };
    var getRowData = (dataBlob, sectionID, rowID) => {
      return dataBlob[rowID];
    };
    var dataSource = new ListView.DataSource({
      getRowData: getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => (row1.cate + '_' + row1.code) !== (row2.cate + '_' + row2.code),
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    var dataBlob = {};
    var sectionIDs = [];
    var rowIDs = [];
    var section = {};
    this.state.list.forEach((item, i) => {
      if (!section[item.cate]) {
        section[item.cate] = [];
      }
      section[item.cate].push(item);
    });
    for (var pro in section) {
      sectionIDs.push(pro);
      rowIDs.push([]);
      section[pro].forEach((item) => {
        rowIDs[rowIDs.length - 1].push(pro + '_' + item.code);
        if (!dataBlob[pro])
          dataBlob[pro] = pro;
        dataBlob[pro + '_' + item.code] = item;
      });
    }
    return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  },
  render: function () {
    var stockRows = [];

    if (this.state.errorMessage) {
      ToastAndroid.show(this.state.errorMessage, ToastAndroid.SHORT);
      stockRows.push(<View key={"placeholder"} style={{ flex: 1 }}></View>);

    } else {
      if (this.state.isLoad && this.state.list.length == 0) {
        ToastAndroid.show('无推荐', ToastAndroid.SHORT);
        stockRows.push(<View key={"placeholder"} style={{ flex: 1 }}></View>);
      } else {
        stockRows.push(<RefreshListView key={'reco_rank_listview'}
          style={styles.container}
          ref={(control) => this._stockList = control}
          onRefresh={this.reloadData}
          pageSize={10}
          dataSource={this.getDataSrouce()}
          renderSectionHeader={this.renderSectionHeader}
          renderRow={this.renderRow} />)
      }
    }


    return (
      <View style={styles.container}>
        <Titlebar showBack={true} title={'综合推荐'} />
        {stockRows}
      </View>
    );
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  sectionHeader: {
    height: 30, padding: 5, borderTopWidth: 1, borderTopColor: '#e5e5e5',
    backgroundColor: '#e5e5e5',
    justifyContent: 'center', alignItems: 'flex-start'
  }
});


module.exports = scrollView;