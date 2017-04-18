var alt = require('../actions/alt');
var actions = require('../actions/techAction');

class TechStore {
	constructor() {
		this.techs = []
		this.techMap = {};
		this.bindListeners({
			handleLoadTechData: actions.LOAD_TECH_DATA
		});
	}
	//{cycle:'day',price:[]}
	handleLoadTechData(techs) {
		this.techs = techs;
		var map = {};
		this.techs.forEach(function (tech) {
			map[tech.code] = tech.name;
		});
		this.techMap = map;
	}
}
module.exports = alt.createStore(TechStore, 'TechStore');