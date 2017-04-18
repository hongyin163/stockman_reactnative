import React, { Component } from 'react';
import CloudAction from '../../actions/cloudAction';
import PositionStore from '../../stores/positionStore';
import { Map, List } from 'immutable';
import { ColorConfig } from '../../config';
import Titlebar from '../control/titlebar';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

class MyAccount extends Component {
    constructor(props) {
        super(props)
        var me = this;
        me.state = {
            account: PositionStore.getState().account
        };
        me.onChange = function (store) {
            me.setState(function (state) {
                state.account = store.account;
            });
        };
    }
    componentDidMount() {
        PositionStore.listen(this.onChange);
        CloudAction.loadMyAmount();
    }
    componentWillUnmount() {
        PositionStore.unlisten(this.onChange);
    }
    render() {
        var me = this;
        var account = me.state.account.toJS();
        // var backgroundColor = ColorConfig.candle.up;
        // if (Number(account.percent < 0)) {
        //     backgroundColor = ColorConfig.candle.down;
        // }
        var total = Number(account.total).format(2, 3, ',', '.');
        var amount = Number(account.amount).format(2, 3, ',', '.');
        var mv = Number(account.mv).format(2, 3, ',', '.');
        return (
            <View style={[styles.container]}>
                <View style={styles.percent}>
                    <Text style={styles.percentText}>{account.percent}%</Text>
                </View>
                <View style={styles.money}>
                    <View style={styles.item}>
                        <Text style={styles.label}>总资产(￥)：</Text>
                        <Text style={styles.value}>{total}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>余额(￥)：</Text>
                        <Text style={styles.value}>{amount}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.label}>总市值(￥)：</Text>
                        <Text style={styles.value}>{mv}</Text>
                    </View>
                </View>
            </View>
        );
    }
};


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConfig.candle.up
    },
    percent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    percentText: {
        fontSize: 60,
        color: '#ffffff'
    },
    money: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 3
    },
    item: {
        flex: 1
    },
    label: {

        fontSize: 15,
        color: 'white'
    },
    value: {

        fontSize: 15,
        color: 'white'
    },
    tabView: {
        flex: 3
    }
});


export default MyAccount;