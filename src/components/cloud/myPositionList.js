'use strict';

import React, { Component } from 'react';
import CloudAction from '../../actions/cloudAction';
import PositionStore from '../../stores/positionStore';
import PullToRefreshView from '../control/pullToRefresh';

import { Map, List } from 'immutable';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

import PostionItem from './positionItem';
import Loading from '../control/loading';
class myPositionList extends Component {
	constructor(props) {
		super(props)
		var me = this;
		me.state = {
			loadState: 0,
			list: PositionStore.getState().account.get('positions')
		}
	}
	componentDidMount() {
		PositionStore.listen(this.onChange.bind(this));
	}
	componentWillUnmount() {
		PositionStore.unlisten(this.onChange.bind(this));
	}
	onChange(store) {
		this.setState(function (state) {
			state.loadState = 1;
			state.list = store.account.get('positions');
		});
	}
	getRows() {
		var me = this;
		var list = me.state.list;
		var rows = [];
		if (list.size > 0) {
			rows = list.map(function (item, i) {
				return <PostionItem key={item.stock_code} data={item} />
			});
		} else {
			rows.push(
				<View key={'pos_empty'} style={styles.msg}>
					<Text>目前空仓</Text>
				</View>
			)
		}
		return rows;
	}
	onRefresh() {
		CloudAction.loadMyAmount();
	}
	render() {
		var me = this;
		if (me.state.loadState == 0) {
			return (
				<View key={'pos_load_warper'} style={styles.msg}>
					<Loading key={'pos_loading'} />
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<PullToRefreshView
					style={styles.container}
					ref={(control) => this._refresh = control}
					onRefresh={this.onRefresh.bind(me)}>
					<View style={styles.header}>
						<Text style={styles.title}>证券/市值</Text>
						<Text style={styles.title}>持仓</Text>
						<Text style={styles.title}>市价/成本价</Text>
						<Text style={styles.title}>盈亏/盈亏比</Text>
					</View>
					<ScrollView >
						{me.getRows()}
					</ScrollView>
				</PullToRefreshView>
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
	msg: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});


module.exports = myPositionList;