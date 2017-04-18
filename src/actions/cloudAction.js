var alt = require('./alt');
//import {createActions} from 'alt/utils/decorators';
import DataCloud from './dataCloud';

var {
	filterConfig,
	userLocal
} = require('./dataLocal');
//@createActions(flux)

class ClcoudActions {
	loadMyPosition() {
		var me = this;
		return (dispatch) => {
			DataCloud.getMyPosition(function (results) {
				dispatch(results);
			})
		}

	}
	loadMyAmount() {
		var me = this;
		return (dispatch) => {
			DataCloud.getMyAmount(function (results) {
				dispatch(results);
			})
		}

	}
	loadRecentTrade() {
		var me = this;
		return (dispatch) => {
			DataCloud.getRecentTrades(function (results) {
				dispatch(results);
			});
		}
	}
	loadTradeStrategy() {
		var me = this;
		return (dispatch) => {
			DataCloud.getTradeStrategy(function (results) {
				dispatch(results);
			});
		}
	}
	saveTradeStrategy(strategy) {
		var me = this;
		return (dispatch) => {
			DataCloud.saveTradeStrategy(strategy, function (results) {
				dispatch(results);
			});
		}
	}
	addStrategy(item) {
		return (dispatch) => {
			dispatch(item);
		}
	}
	cancelChangeStrategy() {
		return (dispatch) => {
			dispatch();
		}
	}
	removeStrategy(name) {
		return (dispatch) => {
			dispatch(name);
		}
	}
}
module.exports = alt.createActions(ClcoudActions);;