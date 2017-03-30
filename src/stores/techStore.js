var alt=require('../actions/alt');
var actions =require('../actions/techAction');

class TechStore {  
	constructor(){
		this.techs=[]
		
		this.bindListeners({
	      	handleLoadTechData:actions.LOAD_TECH_DATA
	    });
	}
	//{cycle:'day',price:[]}
	handleLoadTechData(techs){
		this.techs=techs;
	}
}
module.exports =  alt.createStore(TechStore, 'TechStore');