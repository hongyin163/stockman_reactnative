'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ToastAndroid
} from 'react-native';

import TechStore from '../../stores/techStore';
import TradeStrategyStore from '../../stores/tradeStrategyStore';
import TechAction from '../../actions/techAction';
import CloudAction from '../../actions/cloudAction';
import StrategyItem from './tradeStrategyItem'
import Button from '../control/button';

class tradeStrategy extends Component {
  constructor(props) {
    super(props);
    var me = this;
    me.state = {
      techs: TechStore.getState().techs,
      techMap: TechStore.getState().techMap,
      strategy: TradeStrategyStore.getState()
    };
    me.onTechStoreChange = function (store) {
      me.setState(function (state) {
        state.techs = store.techs;
        state.techMap = store.techMap;
      });
    }
    me.onStrategyChange = function (store) {
      me.setState(function (state) {
        state.strategy = store;
      });
    }
  }
  onSelect(data) {
    if (data.selected) {
      CloudAction.addStrategy(data.code);
    } else {
      CloudAction.removeStrategy(data.code);
    }
  }
  componentDidMount() {
    var me = this;
    TechStore.listen(me.onTechStoreChange);
    TradeStrategyStore.listen(me.onStrategyChange);
    var timer = setTimeout(() => {
      me.setLoading(true);
      TechAction.loadTechData();
      CloudAction.loadTradeStrategy();
      clearTimeout(timer);
    }, 100);
  }
  componentWillUnmount() {
    TechStore.unlisten(this.onTechStoreChange);
    TradeStrategyStore.unlisten(me.onStrategyChange);
  }
  getStrategyList() {
    var me = this;
    var list = me.state.techs;
    var strategy = me.state.strategy.list;

    var map = {};
    strategy.map(function (item) {
      map[item] = true;
    });

    return list.map((data, i) => {
      data.selected = map[data.code] ? true : false;
      return <StrategyItem key={'strategy_' + i}
        data={data}
        index={i} onSelect={me.onSelect} />
    });
  }
  getStrategyContent() {
    var me = this;
    var list = me.state.strategy.list;
    var map = me.state.techMap;
    var array = [];
    if (list.size > 0) {
      array = list.map((data, i) => {
        return map[data].toUpperCase()
      });
    }
    return <Text style={styles.expression}> {array.join(' + ')}</Text>;
  }
  setLoading() {

  }
  onSave() {
    var me = this;
    var list = me.state.strategy.list.toJS();
    debugger;
    CloudAction.saveTradeStrategy(list);
  }
  onCancel() {
    CloudAction.cancelChangeStrategy();
  }
  render() {
    var me = this;

    var msg = me.state.strategy.message;
    if (msg) {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    var btns = [];
    var strategy = me.state.strategy;
    if ((strategy.origin.join(',') != strategy.list.join(','))) {
      btns.push(
        <View key={"btns"} style={[styles.btns]}>
          <Button text={"保存"} color={"#fff"} style={[styles.btn, styles.save]} onPress={me.onSave.bind(me)} />
          <Button text={"取消"} color={"#a5a5a5"} style={[styles.btn, styles.calcel]} onPress={me.onCancel.bind(me)} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.strategyList}>
          {me.getStrategyContent()}
        </View>
        <View style={styles.itemContainer}>
          {me.getStrategyList()}
        </View>
        {btns}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 2
  },
  strategyList: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10
  },
  expression: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btns: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 45,
    width: 90,
    margin: 5,
    borderRadius: 5
  },
  save: {
    backgroundColor: "#c00",
  },
  calcel: {
    backgroundColor: "#e5e5e5",
  }
});


export default tradeStrategy;