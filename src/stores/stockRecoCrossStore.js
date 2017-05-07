var alt = require('../actions/alt');
var actions = require('../actions/recoAction');

class StockRecoCrossStore {
	constructor() {
		this.errorMessage = null;
		this.isLoading = false;
		this.list = [];
		this.bindListeners({
			handleLoadRecoCrossStock: actions.LOAD_RECO_CROSS_STOCK,
			handleUpdateState: actions.UPDATE_STATE,
			handleUpdatePrice: actions.UPDATE_PRICE,
			handleSetLoading: actions.SET_LOADING
		});
	}
	handleUpdatePrice(stocks) {
		this.list = stocks;
		this.errorMessage = null;
	}
	handleUpdateState(stocks) {
		this.list = stocks;
		this.errorMessage = null;
	}
	handleLoadRecoCrossStock(data) {
		this.list = data;
		this.isLoading = false;
	}
	handleSetLoading(isLoading) {
		this.isLoading = isLoading;
	}
}
module.exports = alt.createStore(StockRecoCrossStore, 'StockRecoCrossStore');