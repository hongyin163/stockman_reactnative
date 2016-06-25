var alt=require('../actions/alt');
var actions =require('../actions/objectAction');

class ObjectPriceStore {  
	constructor(){
		this.cycle='day';
		this.detail={};
		this.price={'day':[],'week':[],'month':[]};
		this.volume=[];
            this.recomendList=[];
		this.bindListeners({
	      	handleLoadPriceData:actions.LOAD_PRICE_DATA
	    });
	}
	//{cycle:'day',price:[]}
	handleLoadPriceData(data){
		this.cycle=data.cycle;	
		this.price[data.cycle]=data.price;
	}
}
module.exports =  alt.createStore(ObjectPriceStore, 'ObjectPriceStore');