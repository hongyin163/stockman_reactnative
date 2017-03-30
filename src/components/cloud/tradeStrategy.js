'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import TechStore from '../../stores/techStore';
import TradeStrategyStore from '../../stores/tradeStrategyStore';
import TechAction from '../../actions/techAction';
import CloudAction from '../../actions/cloudAction';
import StrategyItem from './tradeStrategyItem'

class tradeStrategy extends Component {
  constructor(props) {
    super(props);
    var me = this;
    me.state = {
      techs: TechStore.getState().techs,
      strategy: TradeStrategyStore.getState().list
    };
    me.onTechStoreChange = function (store) {
      me.setState(function (state) {
        state.techs = store.techs;
      });
    }
    me.onStrategyChange = function (store) {
      me.setState(function (state) {
        state.strategy = store.list;
      });
    }
  }
  onSelect(data) {
    if (data.selected) {
      CloudAction.addStrategy(data);
    } else {
      CloudAction.removeStrategy(data.name);
    }
  }
  componentDidMount() {
    var me = this;
    TechStore.listen(me.onTechStoreChange);
    TradeStrategyStore.listen(me.onStrategyChange);
    setTimeout(() => {
      me.setLoading(true);
      TechAction.loadTechData();
    }, 100);
  }
  componentWillUnmount() {
    TechStore.unlisten(this.onTechStoreChange);
    TradeStrategyStore.unlisten(me.onStrategyChange);
  }
  getStrategyList() {
    var me = this;
    var list = me.state.techs;
    return list.map((data, i) => {
      return <StrategyItem key={'strategy_' + i}
        data={data}
        index={i} onSelect={me.onSelect} />
    });
  }
  getStrategyContent() {
    var me = this;
    var list = me.state.strategy;
    var array = list.map((data, i) => {
      return data.name.toUpperCase()
    });
    return <Text style={styles.expression}> {array.join(' + ')}</Text>;
  }
  setLoading() {

  }
  render() {
    var me = this;
    return (
      <View>
        <View style={styles.strategyList}>
          {me.getStrategyContent()}
        </View>
        <View style={styles.itemContainer}>
          {me.getStrategyList()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});


export default tradeStrategy;