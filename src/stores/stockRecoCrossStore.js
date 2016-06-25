var alt=require('../actions/alt');
var actions =require('../actions/recoAction');

class StockRecoCrossStore {  
	constructor(){
		this.errorMessage=null;
		this.isLoad=false;
        this.list=[];
		this.bindListeners({
      		handleLoadRecoCrossStock:actions.LOAD_RECO_CROSS_STOCK,
          	handleUpdateState:actions.UPDATE_STATE,
          	handleUpdatePrice:actions.UPDATE_PRICE,
	    });
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
	handleLoadRecoCrossStock(data){
	    this.list=data;
	    this.isLoad=true;
	}
}
module.exports =  alt.createStore(StockRecoCrossStore, 'StockRecoCrossStore');