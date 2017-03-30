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
			userLocal.get(function (err, user) {
				if (err) {
					dispatch && dispatch(err);
					return;
				}
				DataCloud.getMyPosition(user.id, function (results) {
					dispatch(results);
				})
			});
		}

	}
	loadRecentTrade() {
		var me = this;
		return (dispatch) => {
			userLocal.get(function (err, user) {
				if (err) {
					dispatch && dispatch(err);
					return;
				}
				DataCloud.getRecentTrades(user.id, function (results) {
					debugger;
					dispatch(results);
				})
			});
		}
	}
	loadTradeStrategy() {
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