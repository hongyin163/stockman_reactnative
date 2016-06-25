var alt=require('../actions/alt');
var actions =require('../actions/myStockAction');

/*            { name: 'id', type: 'string' },//0
            { name: 'date', type: 'string' },//0
            { name: 'code', type: 'string' },//0
            { name: 'symbol', type: 'string' },//0
            { name: 'type', type: 'string' },//0
            { name: 'name', type: 'string' },//0
            { name: "price", type: 'float' },//0
            { name: "yestclose", type: 'float' },
            { name: "state", type: 'string' },
            { name: "sort", type: 'int' },
            { name: "inhand", type: 'bool' },
            { name: 'day', type: 'int' },
            { name: 'week', type: 'int' },
            { name: 'month', type: 'int' },
            { name: 'last_day', type: 'int' },
            { name: 'last_week', type: 'int' },
            { name: 'last_month', type: 'int' }
*/
class StockPriceStore {  
	constructor(){
		this.cycle='day';
		this.detail={};
		this.price={'day':[],'week':[],'month':[]};
		this.volume=[];
		this.bindListeners({
	      	handleLoadPriceData:actions.LOAD_PRICE_DATA,
	    });
	}
	//{cycle:'day',price:[]}
	handleLoadPriceData(data){
		this.cycle=data.cycle;	
		this.price[data.cycle]=data.price;
	}
}
module.exports =  alt.createStore(StockPriceStore, 'StockPriceStore');