'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
} from 'react-native';

import CloudAction from '../../actions/cloudAction';
import TradeStore from '../../stores/tradeStore';



class recentlyTrades extends Component {
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
	onChange(state) {
		this.setState(function (state) {
			for (var pro in store) {
				state[pro] = store[pro];
			}
		});
	}
	render() {
		return (< View />);
	}
}

const styles = StyleSheet.create({

});


export default recentlyTrades;