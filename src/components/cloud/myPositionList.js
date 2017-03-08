'use strict';

import React, { Component } from 'react';
import CloudAction from '../../actions/cloudAction';
import PositionStore from '../../stores/positionStore';

import {
	StyleSheet,
	View,
	Text
} from 'react-native';

class myPositionList extends Component {
	componentDidMount() {
		PositionStore.listen(this.onChange);
		var me = this;
		setTimeout(() => {
			// me.setLoading(true); 
			CloudAction.loadMyPosition();
		}, 100);
	}
	componentWillUnmount() {
		PositionStore.unlisten(this.onChange);
	}
	onChange(store) {
		this.setState(function (state) {
			for (var pro in store) {
				state[pro] = store[pro];
			}
		});
	}
	render() {
		return (
			<View >
				<Text>哈哈</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({

});


module.exports = myPositionList;