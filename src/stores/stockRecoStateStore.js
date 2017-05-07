var alt = require('../actions/alt');
var actions = require('../actions/recoAction');

class StockRecoStateStore {
	constructor() {
		this.list = [];
		this.isLoading = false;
		this.bindListeners({
			handleLoadRecoStateStock: actions.LOAD_RECO_STATE_STOCK,
			handleUpdateState: actions.UPDATE_STATE,
			handleUpdatePrice: actions.UPDATE_PRICE,
			handleSetLoading: actions.SET_LOADING
		});
	}
	handleLoadRecoStateStock(data) {
		this.list = data;
		this.errorMessage = null;
		this.isLoading = false;
	}
	handleUpdatePrice(stocks) {
		this.list = stocks;
		this.errorMessage = null;
	}
	handleUpdateState(stocks) {
		this.list = stocks;
		this.errorMessage = null;
	}
	handleSetLoading(isLoading) {
		this.isLoading = isLoading;
	}
}
module.exports = alt.createStore(StockRecoStateStore, 'StockRecoStateStore');