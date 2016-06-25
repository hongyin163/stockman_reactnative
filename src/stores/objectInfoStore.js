var alt=require('../actions/alt');
var actions =require('../actions/objectAction');

class ObjectInfoStore {  
	constructor(){
		this.data={};
		this.bindListeners({
	      	handelLoadObjectInfo:actions.LOAD_OBJECT_INFO,
	    });
	}
	handelLoadObjectInfo(detail){
		this.data=detail;
	}
}
module.exports =  alt.createStore(ObjectInfoStore, 'ObjectInfoStore');