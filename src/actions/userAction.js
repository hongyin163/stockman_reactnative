var alt = require('./alt');
var dataUser = require('./dataUser')
	//import {createActions} from 'alt/utils/decorators';

//@createActions(flux)

class UserActions {
	updateInfo(data) {
		this.dispatch(data);
	}
	initInfo() {
		var me = this;
		dataUser.getLocalInfo(function(err, data) {
			me.dispatch(data);
		});
	}

}
module.exports = alt.createActions(UserActions);;