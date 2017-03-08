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
		return (dispatch)=>{
			DataCloud.getMyPosition(function (results) {
				dispatch(results);
			})
		}
		
	}
	loadRecentTrade(){
		var me=this;
		return (dispatch)=>{
			DataCloud.getRecentTrades(function (results) {
				dispatch(results);
			})
		}
	}
	loadTradeStrategy() {
	}
}
module.exports = alt.createActions(ClcoudActions);;