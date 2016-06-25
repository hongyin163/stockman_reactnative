var alt=require('../actions/alt');
var actions =require('../actions/recoAction');

class StockRecoRankStore {  
	constructor(){
        this.list=[];
        this.isLoad=false;
		this.bindListeners({
      		handleLoadRecoRankStock:actions.LOAD_RECO_RANK_STOCK,
          	handleUpdateState:actions.UPDATE_STATE,
          	handleUpdatePrice:actions.UPDATE_PRICE,
	    });
	}
	handleLoadRecoRankStock(data){
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
module.exports =  alt.createStore(StockRecoRankStore, 'StockRecoRankStore');