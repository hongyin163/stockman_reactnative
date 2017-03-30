var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');

class PositionAddStore {
	constructor() {
		this.list = [];
		this.bindListeners({
			handleLoadMyPosition: actions.LOAD_MY_POSITION
		});
	}
	handleLoadMyPosition(data) {
		debugger;
		this.list = data;
	}
}
module.exports = alt.createStore(PositionAddStore, 'PositionAddStore');