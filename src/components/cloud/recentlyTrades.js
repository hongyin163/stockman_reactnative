'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

import CloudAction from '../../actions/cloudAction';
import TradeStore from '../../stores/tradeStore';
import { Map, List } from 'immutable';
import TradeItem from './tradeItem';


class recentlyTrades extends Component {
	constructor(props) {
		super(props)
		var me = this;
		me.state = {
			data: Map({
				list: []
			})
		}
		me.onChange = function (store) {
			me.setState(function (state) {
				debugger;
				return {
					data: state.data.set('list', store.list)
				}
			});
		}
	}
	componentDidMount() {
		TradeStore.listen(this.onChange);
		var me = this;
		setTimeout(() => {
			me.setLoading(true);
			CloudAction.loadRecentTrade();
		}, 100);
	}
	componentWillUnmount() {
		TradeStore.unlisten(this.onChange);
	}
	setLoading(isLoading) {

	}
	onChange(state) {
		this.setState(function (state) {
			return {
				data: state.data.set('list', store.list)
			}
		});
	}
	getRows() {
		var me = this;
		var list = me.state.data.get('list');
		var rows = [];
		if (list.length > 0) {
			rows = list.map(function (item, i) {
				return <TradeItem key={item.stock_code} data={item} />
			});
		}
		return rows;
	}
	render() {
		var me = this;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>证券</Text>
					<Text style={styles.title}>交易量/交易</Text>
					<Text style={styles.title}>成交价</Text>
					<Text style={styles.title}>日期</Text>
				</View>
				<ScrollView >
					{me.getRows()}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9',
	},
	title: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center'
	}
});


export default recentlyTrades;