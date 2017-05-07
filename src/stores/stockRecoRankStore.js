var alt = require('../actions/alt');
var actions = require('../actions/recoAction');

class StockRecoRankStore {
	constructor() {
		this.list = [];
		this.isLoading = false;
		this.bindListeners({
			handleLoadRecoRankStock: actions.LOAD_RECO_RANK_STOCK,
			handleUpdateState: actions.UPDATE_STATE,
			handleUpdatePrice: actions.UPDATE_PRICE,
			handleSetLoading: actions.SET_LOADING
		});
	}
	handleLoadRecoRankStock(data) {
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
module.exports = alt.createStore(StockRecoRankStore, 'StockRecoRankStore');