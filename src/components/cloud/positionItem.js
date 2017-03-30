'use strict';

import React, { Component } from 'react';
import CloudAction from '../../actions/cloudAction';
import PositionStore from '../../stores/positionStore';
import { Map, List } from 'immutable';
import {
    StyleSheet,
    View,
    Text,

} from 'react-native';

var Item = React.createClass({
    render: function () {
        // <amount>-890</amount>
        // <cost>18.200</cost>
        // <count>500</count>
        // <percent>-0.1</percent>
        // <price>16.42</price>
        // <stock_code>0600000</stock_code>
        // <stock_name>浦发银行</stock_name>
        var me = this;
        var data = me.props.data;
        return (
            <View style={styles.row}>
                <View style={styles.name}>
                    <Text>{data.stock_name}</Text>
                </View>
                <View style={styles.position}>
                    <Text>{data.count}</Text>
                </View>
                <View style={styles.price}>
                    <Text>{data.price}</Text>
                    <Text>{data.cost}</Text>
                </View>
                <View style={styles.percent}>
                    <Text>{data.amount}</Text>
                    <Text>{data.percent}</Text>
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

export default Item;