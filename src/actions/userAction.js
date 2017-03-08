var alt = require('./alt');
var dataUser = require('./dataUser')
//import {createActions} from 'alt/utils/decorators';

//@createActions(flux)

class UserActions {
	updateInfo(data) {
		return (dispatch) => {
			dispatch(data);
		}
	}
	initInfo() {
		return (dispatch) => {
			dataUser.getLocalInfo(function (err, data) {
				dispatch(data);
			});
		}
	}
}
module.exports = alt.createActions(UserActions);;