var alt = require('./alt');
//import {createActions} from 'alt/utils/decorators';
var {
	filterConfig
} = require('./dataLocal');
//@createActions(flux)

class FilterActions {
	select(name, index,multiselect) {
		return (dispatch)=>{
			dispatch({
				name: name,
				index: index,
				multiselect:multiselect
			});
		}
	}
	load(){
		var me=this;
		return (dispatch)=>{
			debugger;
			filterConfig.get(function (err,data) {
				dispatch(data);
			});
		}
	}
	save(values) {
		filterConfig.save(values);
	}
	get(callback){
		filterConfig.get(callback);
	}
}
module.exports = alt.createActions(FilterActions);;