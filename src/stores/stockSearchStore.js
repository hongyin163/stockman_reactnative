var alt=require('../actions/alt');
var actions =require('../actions/myStockAction');

class StockSearchStore {  
      constructor(){
            this.input='002024'
            this.list =[];
            this.bindListeners({
            	handleSearch:actions.SEARCH
            });
      }
      handleSearch(obj){
            this.input=obj.input;
            this.list=obj.list;
      }
}
module.exports =  alt.createStore(StockSearchStore, 'StockSearchStore');