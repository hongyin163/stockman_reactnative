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
			DataCloud.getMyPosition(user.id, function (results) {
				dispatch(results);
			})
		}

	}
	loadRecentTrade() {
		var me = this;
		return (dispatch) => {
			DataCloud.getRecentTrades(user.id, function (results) {
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
			DataCloud.saveTradeStrategy(strategy,function (results) {
				dispatch(results);
			});
		}
	}
	addStrategy(item) {
		return (dispatch) => {
			dispatch(item);
		}
	}
	removeStrategy(name) {
		return (dispatch) => {
			dispatch(name);
		}
	}
}
module.exports = alt.createActions(ClcoudActions);;