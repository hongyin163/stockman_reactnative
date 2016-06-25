var alt=require('../actions/alt');
var actions =require('../actions/objectAction');

class ObjectAddStore {  
	constructor(){
		this.data={}
		this.bindListeners({
	      	handleLoadObjectList:actions.LOAD_OBJECT_LIST
	    });
	}
	//{cycle:'day',price:[]}
	handleLoadObjectList(data){
		this.data[data.cate]=data.data;
	}
}
module.exports =  alt.createStore(ObjectAddStore, 'ObjectAddStore');