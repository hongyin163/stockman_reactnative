var alt=require('../actions/alt');
var actions =require('../actions/myStockAction');

class StockInfoStore {  
	constructor(){
		this.data={};
		this.bindListeners({
	      	handelLoadStockInfo:actions.LOAD_STOCK_INFO,
	    });
	}
	handelLoadStockInfo(detail){
		this.data=detail;
	}
}
module.exports =  alt.createStore(StockInfoStore, 'StockInfoStore');