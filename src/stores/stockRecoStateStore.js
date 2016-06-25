var alt=require('../actions/alt');
var actions =require('../actions/recoAction');

class StockRecoStateStore {  
	constructor(){
        this.list=[];
        this.isLoad=false;
		this.bindListeners({
      		handleLoadRecoStateStock:actions.LOAD_RECO_STATE_STOCK,
          	handleUpdateState:actions.UPDATE_STATE,
          	handleUpdatePrice:actions.UPDATE_PRICE,
	    });
	}
	handleLoadRecoStateStock(data){
	    this.list=data;
	    this.isLoad=true;
	}
	handleUpdatePrice(stocks){
		this.list=stocks;
		// this.isLoading=false;
		this.errorMessage=null;
	}
	handleUpdateState(stocks){
		this.list=stocks;
		// this.isLoading=false;
		this.errorMessage=null;
	}
}
module.exports =  alt.createStore(StockRecoStateStore, 'StockRecoStateStore');