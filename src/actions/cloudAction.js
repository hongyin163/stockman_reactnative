var alt = require('./alt');
//import {createActions} from 'alt/utils/decorators';
import DataCloud from './dataCloud';

var {
	filterConfig
} = require('./dataLocal');
//@createActions(flux)

class ClcoudActions {
	loadMyPosition() {
		var me=this;
		DataCloud.getMyPosition(function (results) {
			me.dispatch(results);
		})
		
	}
	loadRecentTrade(){
		var me=this;
		DataCloud.getRecentTrades(function (results) {
			me.dispatch(results);
		})
	}
	loadTradeStrategy() {
	}
}
module.exports = alt.createActions(ClcoudActions);;