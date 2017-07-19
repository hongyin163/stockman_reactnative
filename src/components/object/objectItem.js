'use strict';

import React, { Component, PropTypes } from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  View,
  Text,
  NativeAppEventEmitter,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';

var TextButton = require('../control/button');
var NavAction = require('../../actions/navigationAction');
//var StockDetail=require('./stockDetail');
var TechChart = require('../chart/techChart');
var myStockAction = require('../../actions/myStockAction');
var TechBar = require('../chart/techBar');
var TechChartListAllCycle = require('../chart/techChartListAllCycle');
var Nav = require('../nav');
var Loading = require('../control/loading');

var SCREEN_WIDTH = Dimensions.get('window').width;
/*            { name: 'id', type: 'string' },//0
            { name: 'date', type: 'string' },//0
            { name: 'code', type: 'string' },//0
            { name: 'symbol', type: 'string' },//0
            { name: 'type', type: 'string' },//0
            { name: 'name', type: 'string' },//0
            { name: "price", type: 'float' },//0
            { name: "yestclose", type: 'float' },
            { name: "state", type: 'string' },
            { name: "sort", type: 'int' },
            { name: "inhand", type: 'bool' },
            { name: 'day', type: 'int' },
            { name: 'week', type: 'int' },
            { name: 'month', type: 'int' },
            { name: 'last_day', type: 'int' },
            { name: 'last_week', type: 'int' },
            { name: 'last_month', type: 'int' }
*/
var TechChartList = React.createClass({
  propTypes: {
    code: PropTypes.string,
    name: PropTypes.string,
    techCode: PropTypes.string,
  },
  getDefaultProps: function () {
    return {
      code: '',
      name: '',
      techCode: 'T0001'
    };
  },
  getInitialState: function () {
    var state = {
      loadState: 0,//0,未加载，1，加载中，2，加载完成，3加载失败
      code: this.props.code,
      name: this.props.name,
      techCode: this.props.techCode,
      price: { 'day': [], 'week': [], 'month': [] },
      techPanelHeight: new Animated.Value(0),
      chartPanelTop: new Animated.Value(0),
    };
    state.price[state.cycle] = [];
    return state;
  },
  componentDidMount: function () {
    //StockItemStore.listen(this.onChange);
    // var me=this;
    // setTimeout(function(){
    //   myStockAction.loadPriceData(me.props.code,me.props.cycle);
    // },500);   
  },
  componentWillUnmount: function () {
    //StockItemStore.unlisten(this.onChange);
  },
  onChange: function (state) {
    //this.setState(state);
  },
  _hidden: false,
  loadData: function (code) {
    var me = this;
    var state = this.state;

    if (state.loadState == 0) {
      me.setState(function (state) {
        state.loadState = 1;
      }, function () {

        Animated.spring(
          this.state.techPanelHeight,         // Auto-multiplexed
          {
            toValue: 280,
            friction: 9,
            tension: 70
          },

        ).start(function (argument) {
          myStockAction.loadKDataAllCycle(code, '3', (data) => {
            me._hidden = false;
            state.price = data;
            state.loadState = 2;
            me.setState(state);
          });
        });

      });

    } else {
      if (me._hidden == true) {
        Animated.parallel([
          Animated.spring(
            this.state.techPanelHeight,         // Auto-multiplexed
            {
              toValue: 280,
              friction: 9,
              tension: 70
            },
          ),
          Animated.spring(
            this.state.chartPanelTop,         // Auto-multiplexed
            {
              toValue: 0,
              friction: 9,
              tension: 70
            },
          )
        ]).start(() => {
          me._hidden = false;
        });
        me._hidden = false;
      }
      else {
        Animated.parallel([
          Animated.spring(
            this.state.techPanelHeight,         // Auto-multiplexed
            {
              toValue: 0,
              friction: 9,
              tension: 70
            },
          ),
          Animated.spring(
            this.state.chartPanelTop,         // Auto-multiplexed
            {
              toValue: -280,
              friction: 9,
              tension: 70
            },
          )
        ]).start(() => {
          me._hidden = true;
        });
        me._hidden = true;
      }



    }

  },
  onTechSelect: function (code, name) {
    var state = this.state;
    state.techCode = code;
    // state.hidden=false;
    this.setState(state);
    // this.refs.tech_day.setTechState(code,name);
    // this.refs.tech_week.setTechState(code,name);
    // this.refs.tech_month.setTechState(code,name);

  },
  onNext: function (argument) {
    this._techBar.next();
  },
  render: function () {

    // var charts = [];
    // var cycle = { 'day': '日', 'week': '周', 'month': '月', };
    // var price = this.state.price;
    // for (var pro in price) {
    //   var data = price[pro];
    //   if (data.length == 0) { continue; }
    //   debugger;
    //   if (pro == 'month')
    //     charts.push(<TechChart key={'tech_' + pro} ref={'tech_' + pro} description={cycle[pro]} style={styles.techChart} enableLegend={true} code={this.state.techCode} data={data} />);
    //   else
    //     charts.push(<TechChart key={'tech_' + pro} ref={'tech_' + pro} description={cycle[pro]} style={styles.techChart} code={this.state.techCode} data={data} />);
    // }

    var childs = [];
    if (this.state.loadState == 0) {
      return <View key={'empty'} />
    } else if (this.state.loadState == 1) {
      childs.push(<Loading key={'Loading'} />)
    }else if (this.state.loadState == 2) {
      childs.push(<TechChartListAllCycle key={'TechChartListAllCycle'} style={{ height: 240 }} onPress={this.onNext} code={this.state.techCode} data={this.state.price} />);
      childs.push(<TechBar key={'TechBar'} ref={(n) => this._techBar = n} style={{ height: 40, flex: 1 }} includeVol={false} onSelect={this.onTechSelect} />);
      // childs.push(<View key={'Charts'} style={{ height: 240 }}>{charts}</View>);
      // childs.push(<TechBar key={'TechBar'} ref={(n) => this._techBar = n} style={{ height: 40, flex: 1 }} includeVol={false} onSelect={this.onTechSelect} />);
    } else {
      childs.push(<View key={'Loading'} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>加载中...</Text></View>)
    }
    return (
      <Animated.View style={[{ overflow: 'hidden',zIndex: 10 }, this.props.style, { height: this.state.techPanelHeight }]}>
          <Animated.View style={{ position: 'absolute',zIndex: 9, left: 0, right: 0, bottom: 0, top: this.state.chartPanelTop }}>
            {childs}
          </Animated.View>
      </Animated.View>
    );
  }
});

var Stock = React.createClass({
  getInitState: function () {
    return {
      data: this.props.data
    };
  },
  _panResponder: {},
  componentWillMount: function () {
    this._openTech = false;
  },
  getPercent: function (record) {
    var price = record.price;
    var yestclose = record.yestclose;
    var inhand = record.inhand;
    var subn = Number(price - yestclose);

    var sub = "%";
    var percent = 0;
    if (price > 0 && yestclose > 0) {
      percent = ((subn * 100 / yestclose)).toFixed(2);
      sub = percent + "%";
      if (percent > 0) {
        sub = "+" + sub;
      }
    } else {
      price = yestclose;
      sub = "0%";
    }
    return sub;
  },
  getStateStyle: function (cycle) {
    var stock = this.props.data;
    var backColor = "";
    if (stock[cycle] == 1) {
      backColor = '#c00';
    } else if (stock[cycle] == 0) {
      backColor = '#ccc';
    } else if (stock[cycle] == -1) {
      backColor = "#006030";
    }
    var style = {
      backgroundColor: backColor,
      width: 20,
      height: 20,
      marginRight: 2
    }
    return style;
  },
  getPercentStyle: function () {
    // $up2-color:#cc0000;
    // $up1-color:#FF6666;
    // $down1-color:#99CC66;
    // $down2-color:#006030;
    var stock = this.props.data;
    var backColor = "";
    var percent = Number(stock.price - stock.yestclose) / stock.price;
    if (stock.price >= stock.yestclose) {
      if (percent >= 0 && percent <= 0.03)
        backColor = "#FF6666";
      else
        backColor = "#c00";
    } else {
      if (percent < 0 && percent >= -0.03)
        backColor = "#99CC66";
      else
        backColor = "#006030";
    }
    var style = {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: backColor,
      //width:80,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center'
    };
    return style;
  },
  getPriceStyle: function () {
    var stock = this.props.data;
    var backColor = "";
    if (stock.price > stock.yestclose) {
      backColor = "#c00";
    } else {
      backColor = "#006030";
    }
    var style = {
      // flexDirection:'row',
      // justifyContent:'center',
      fontWeight: 'bold',
      color: backColor
    };
    return style;
  },
  getInHandStyle: function () {
    var style = {
      borderLeftColor: '#c00',
      borderLeftWidth: 3,
    }
    if (this.props.data.inhand == true) {
      return style;
    }
    return {
      borderLeftWidth: 0
    }
  },
  onSelect: function () {
    // NativeAppEventEmitter.emit('nav',{
    //   name:'stockDetail',
    //   component:StockDetail,
    //   props:{
    //     name:this.props.data.name,
    //     code:this.props.data.code,
    //     cycle:'day'
    //   }
    // });  

    // Nav.open({
    //   name:'stockDetail',
    //   component:StockDetail,
    //   props:{
    //     name:this.props.data.name,
    //     code:this.props.data.code,
    //     cycle:'day'
    //   }
    // })
    this.props.onSelect && this.props.onSelect(this.props.data);
  },
  onOpenTechChart: function () {
    // console.log('loadPriceData');
    var me = this;
    me._techList.loadData(me.props.data.code);

  },
  onSetInMyHand: function () {
    this._rowViewStyle.style.right.setValue(0);
    myStockAction.setInHand(this.props.data.code, !this.props.data.inhand);
  },
  onSetTop: function () {
    this._rowViewStyle.style.right.setValue(0);
    myStockAction.setTop(this.props.data.code);
  },
  onRemove: function () {
    myStockAction.remove(this.props.data.code);
  },
  render: function () {
    var stock = this.props.data;

    return (
      <View style={styles.container}>
        <View style={[styles.row]}>
          <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
            onPress={this.onSelect}>
            <View style={styles.info}>
              <View style={styles.name}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{stock.name}</Text>
                <Text style={{ fontSize: 11 }}>{stock.code}</Text>
              </View>
              <View style={styles.price}>
                <Text style={this.getPriceStyle()}>{stock.price}</Text>
              </View>
              <View style={this.getPercentStyle()}>
                <Text style={styles.percentText}>{this.getPercent(stock)}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
            onPress={this.onOpenTechChart}>
            <View style={styles.state}>
              <View style={this.getStateStyle('day')}></View>
              <View style={this.getStateStyle('week')}></View>
              <View style={this.getStateStyle('month')}></View>
            </View>
          </TouchableNativeFeedback>
          {
            (() => stock.count == undefined ? [] : [<View key={'count_' + stock.code} style={styles.count}><Text style={styles.countText}>{stock.count}</Text></View>])()
          }
        </View>
        <TechChartList ref={(control) => this._techList = control} code={this.props.data.code} />
      </View>
    );
  }
});

//  
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    //padding: 5,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    borderRightColor: '#EAEAEA',
    borderRightWidth: 1
  },
  info: {
    paddingLeft: 10,

    height: 50,
    flexDirection: 'row',
    flex: 3
  },
  techChart: {
    height: 80
  },
  percent: {
    backgroundColor: '#c00',
    // paddingTop:10,
    // paddingBottom:10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  percentText: {
    color: '#fff',
    fontWeight: "500"
  },
  state: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 10,
  },
  name: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center'
  },
  price: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  slideWin: {
    position: 'absolute',
    left: 0, top: 0, right: 0, bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },
  slideBtn: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideBtn2: {
    width: 80,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  count: {
    position: 'absolute',
    backgroundColor: '#c00',
    right: 1,
    top: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: 'center',
    width: 20,
    height: 15
  },
  countText: {
    color: '#ffffff'
  }
});
module.exports = Stock;