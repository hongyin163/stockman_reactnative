'use strict';

import React, { Component } from 'react';
import CloudAction from '../../actions/cloudAction';
import PositionStore from '../../stores/positionStore';
import { Map, List } from 'immutable';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';

import PostionItem from './positionItem';


class myPositionList extends Component {
	constructor(props) {
		super(props)
		var me = this;
		me.state = {
			data: Map({
				list: []
			})
		}
	}
	componentDidMount() {
		debugger;
		PositionStore.listen(this.onChange.bind(this));
		var me = this;
		setTimeout(() => {
			// me.setLoading(true); 
			debugger;
			CloudAction.loadMyPosition();
		}, 100);
	}
	componentWillUnmount() {
		PositionStore.unlisten(this.onChange.bind(this));
	}
	onChange(store) {
		this.setState(function (state) {
			return {
				data: state.data.set('list', store.list)
			}
		});
	}
	getRows() {
		var me = this;
		debugger;
		var list = me.state.data.get('list');
		var rows = [];
		if (list.length > 0) {
			rows = list.map(function (item, i) {
				return <PostionItem key={item.stock_code} data={item} />
			});
		}
		return rows;
	}
	render() {
		var me = this;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>证券/市值</Text>
					<Text style={styles.title}>持仓</Text>
					<Text style={styles.title}>市价/成本价</Text>
					<Text style={styles.title}>盈亏/盈亏比</Text>
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
		textAlign:'center'
	}
});


module.exports = myPositionList;