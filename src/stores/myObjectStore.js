var alt=require('../actions/alt');
var actions =require('../actions/objectAction');
var {
  objectLocal
}=require('../actions/dataLocal');
class MyObjectStore {  
	constructor(){
		this.errorMessage=null;
	    this.list =[];
	    this.isLoading=false;
	    //this.loadingText="加载中..."
	    this.sort='';
	    this.tech={
	    	code:'T0001',
	    	name:'MACD'
	    }
		this.bindListeners({
			handleAdd: actions.ADD,
	      	handleRemove:actions.REMOVE,
	      	handelLoadMyObjects:actions.LOAD_MY_OBJECTS,
	      	handleDownLoadMyObject:actions.DOWN_LOAD,
      		handleUpdateState:actions.UPDATE_STATE,
          	handleUpdatePrice:actions.UPDATE_PRICE,
          	handleSetTop:actions.SET_TOP,
          	//handleLoadFailed:actions.LOAD_FAILED,
          	//handleSetLoading:actions.SET_LOADING,
          	handleSort:actions.SORT,
          	//handleSetTech:actions.SET_TECH
          	handleLoadRecoCateCount:actions.LOAD_RECO_CATE_COUNT
	    });
	}
	handelLoadMyObjects(objects){

		this.list=objects.sort((a,b)=>{
			return Number(b.type)-Number(a.type);
		});
	}
	handleDownLoadMyObject(stocks){
		this.list=stocks;
		this.syncToLocal();
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
	handleLoadRecoCateCount(results){
		var obj={};
		results.forEach((item,i)=>{
			obj[item.cate_code]=item.count;
		});
		this.list.forEach((item,i)=>{
			item['count']=obj[item.code];
		});

	}
	handleSetTop(code){
		var me=this;		
		var stocks=me.list;
		if(stocks.length>2){
			var target=null;
			stocks.forEach((item)=>{
				if(item.code==code){
					target=item;
					return false;
				}
			});

			var sortList=stocks.sort(function (a,b) {
				// if(b.code==code){
				// 	target=b;
				// }
				return b.sort-a.sort;
			});
			if(target)
				target.sort=sortList[0].sort+10;
			me.list=me.list(me.stockList,me.sort);
		}
		me.syncToLocal();
	}
	handleAdd(stock) {	
		var me=this;
		if(!this.list||!this.list.map){
			this.list=[];
		}	
		if(this.list.length>0){
			var items=[];
			var count=0;
			this.list.forEach((item)=>{
				if(item.code==stock.code){
					count++;
				}
			});
			if(count>0){
				return;
			}
		}
		this.list.push(stock);
		me.syncToLocal();
	}
	handleLoadFailed(errorMessage){
		this.errorMessage=errorMessage;
		this.isLoading=false;
	}
	handleSetLoading(isLoading){
		this.isLoading=isLoading;
		this.errorMessage=null;
	}
	handleRemove(code){
  		var me=this;
		var n=-1;
		me.list.map(function (item,i) {
			if(item.code==code){
				n=i;
			}
		});
		me.list.splice(n,1);
		me.syncToLocal();
	}
	handleSetInHand(obj){
		var me=this;

		var code=obj.code;
		var inhand=obj.inhand;
		
		var n=-1;
		me.list.map(function (item,i) {
			if(item.code==code){
				n=i;
			}
		});
	  	me.list[n].inhand=inhand;
	  	me.list=me.sortList(me.list,me.sort);
	  	me.syncToLocal();
	}
	handleSort(direction){
		this.sort=direction;
		this.list=this.sortList(this.list,this.sort);		
	}
	handleSetTech(tech){
		this.tech.code=tech.code;
		this.tech.name=tech.name;
	}
	sortList(list,sort){
		var top=[];
		var last=[];
		list.forEach(function(obj){
			if(obj.inhand==true){
				top.push(obj);
			}else{
				last.push(obj);
			}
		});
		last=last.sort(function (a,b) {
          if(sort=='asc'){
            return(a.percent-b.percent);
          }else if(sort=='desc'){
            return (b.percent-a.percent);
          }else{
            return b.sort-a.sort;
          }
      	});
      	return top.concat(last);
	}
	syncToLocal(){
		debugger;
		objectLocal.save(this.list);		
	}
}
module.exports =  alt.createStore(MyObjectStore, 'MyObjectStore');