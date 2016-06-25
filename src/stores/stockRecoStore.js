var alt=require('../actions/alt');
var actions =require('../actions/myStockAction');

class StockRecoStore {  
	constructor(){
        this.list=[];
		this.bindListeners({
                  handleLoadRecommedStock:actions.LOAD_RECOMMEND_STOCK
	    });
	}
      handleLoadRecommedStock(data){
            this.list=data;
      }
}
module.exports =  alt.createStore(StockRecoStore, 'StockRecoStore');