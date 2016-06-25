var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');

class PositionAddStore {
	constructor() {
		this.data = {}
		this.bindListeners({
			handleLoadMyPosition: actions.LOAD_MY_POSITION
		});
	}
	handleLoadMyPosition(data) {
		this.data = data;
	}
}
module.exports = alt.createStore(PositionAddStore, 'PositionAddStore');