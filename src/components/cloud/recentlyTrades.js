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
import TradeItem from './tradeItem';
import PullToRefreshView from '../control/pullToRefresh';
import Loading from '../control/loading';

class recentlyTrades extends Component {
	constructor(props) {
		super(props)
		var me = this;
		me.state = {
			data: TradeStore.getState().data
		}
		me.onChange = function (store) {
			me.setState(function (state) {
				state.data = store.data;
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
	getRows() {
		var me = this;

		return rows;
	}
	onRefresh() {
		CloudAction.loadRecentTrade();
	}
	render() {
		var me = this;
		var data = me.state.data.toJS();

		var rows = [];
		if (data.loadState == 1) {
			var list = data.list;
			if (list.length > 0) {
				rows = list.map(function (item, i) {
					return <TradeItem key={item.stock_code} data={item} />
				});
			} else {
				rows.push(
					<View key={'trade_empty'} style={styles.msg}>
						<Text>目前空仓</Text>
					</View>
				);
			}
		}

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>证券</Text>
					<Text style={styles.title}>交易量/交易</Text>
					<Text style={styles.title}>成交价</Text>
					<Text style={styles.title}>日期</Text>
				</View>
				<ScrollView style={styles.rowContainer}
					refreshControl={
						<PullToRefreshView
							refreshing={data.loadState === 0 || false}
							ref={(control) => this._refresh = control}
							onRefresh={this.onRefresh.bind(me)} />
					}>
					{rows}
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
	},
	rowContainer: {
		flex: 1
	},
	msg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});


export default recentlyTrades;