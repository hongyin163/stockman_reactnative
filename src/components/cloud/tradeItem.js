'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

var TradeItem = React.createClass({
    getDate: function (dateStr) {

    },
    getTradeType: function (direact) {
        debugger;
        if (Number(direact)== 0) {
            return '卖出'
        }
        return '买入';
    },
    render: function () {
        /*<code>E7330DA42DBD918E5AE2762299355EF1_0600062</code>
  <count>1000</count>
  <date>2017-03-25T18:24:14.3772703+08:00</date>
  <direact>1</direact>
  <price>10</price>
  <stock_code>0600062</stock_code>
  <stock_name>华润双鹤</stock_name>*/
        var me = this;
        var data = me.props.data;
        var times = Date.parse(data.date);
        var date = new Date();
        date.setTime(times);
        return (
            <View style={styles.row}>
                <View style={styles.name}>
                    <Text>{data.stock_name}</Text>
                </View>
                <View style={styles.position}>
                    <Text>{data.count}</Text>
                    <Text>{me.getTradeType(data.direact)}</Text>
                </View>
                <View style={styles.price}>
                    <Text>{data.price}</Text>
                </View>
                <View style={styles.percent}>
                    <Text>{date.toLocaleDateString()}</Text>
                </View>
            </View>
        )
    }
});
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#d9d9d9',
    },
    name: {
        flex: 1,
        alignItems: 'center',
    },
    position: {
        flex: 1,
        alignItems: 'center'
    },
    price: {
        flex: 1,
        alignItems: 'center'
    },
    percent: {
        flex: 1,
        alignItems: 'center'
    }
});

export default TradeItem;