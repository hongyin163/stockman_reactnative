var alt = require('../actions/alt');
var actions = require('../actions/userAction');

class UserInfoStore {
	constructor() {
		this.data = {}
		this.bindListeners({
			handleUpdateInfo: actions.UPDATE_INFO,
			handleInitInfo: actions.INIT_INFO
		});
	}
	//{cycle:'day',price:[]}
	handleUpdateInfo(data) {
		this.data = data;
	}
	handleInitInfo(data) {
		this.data = data;
	}
}
module.exports = alt.createStore(UserInfoStore, 'UserInfoStore');