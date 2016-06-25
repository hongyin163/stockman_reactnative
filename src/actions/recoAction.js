var alt= require('./alt');
var dataStock=require('./dataStock');
var {
  stockLocal
}=require('./dataLocal');
var util=require('./util');

class RecoActions {  	
  loadRecommendStock(){
    var me=this;
    dataStock.findStockRankBy('','',function (items) {
      me.dispatch(items);
    });
  }
  loadRecoRankStock(callback){
    var me=this;
    dataStock.findStockRankBy('','',function (items) {
      me.dispatch(items);
      callback&&callback();
    });
  }
  loadRecoCrossStock(cycle,callback){
    var me=this;
    dataStock.findCrossStock(cycle,function (items) {
      me.dispatch(items);
      callback&&callback();
    });
  }
  loadRecoStateStock(cycle,callback){
    var me=this;
    dataStock.findStateStock(cycle,function (items) {
      me.dispatch(items);
      callback&&callback();
    });
  }
  add(item){
  	var obj={
  		code:item.code,
  		name:item.name,
  		type:item.type,
  		symbol:item.symbol,
  		date:'',
  		price:item.price,
  		yestclose:item.yestclose,
  		sort:0,
  		inhand:false,
  		day:0,
  		week:0,
  		month:0,
  		last_day:0,
  		last_week:0,
  		last_month:0
  	};
  	this.dispatch(obj);
  }
  remove(code){
  	this.dispatch(code);
  }
  setInHand(code,inhand){
  	this.dispatch({
  		code:code,
  		inhand:inhand
  	});
  }
  updatePrice(state,callback){
  	var me=this;

  	if(state==undefined||state.list==undefined||state.list.length==0)
  		return;

  	if(!state.list.map)
  		return;

  	//me.actions.setLoading(true);
  	
  	var idArray=state.list.map((item)=>item.code);
  	var ids=idArray.join(',');

  	dataStock.getPrice(ids,function (result) {
  		var items=state.list;
  		for (var i = 0; i < items.length; i++) {
			if(!result[items[i].code])
				continue;
			var item=items[i];
			item.date=result[item.code].date;
			item.price=result[item.code].price;
			item.yestclose=result[item.code].yestclose;
			if(item.price>0&&item.yestclose>0)
				item.percent=Number(item.price - item.yestclose)/item.price;
			else
				item.percent=0;
		};
  		me.dispatch(items);
  		callback&&callback();
  	}); 
  }
  updateState(state,techCode,callback){
  	var me=this;
  	if(state.list==undefined||state.list.length==0)
  		return;
  	if(!state.list.map)
  		return;
  	//me.actions.setLoading(true);
  	var idArray=state.list.map((item)=>'1_'+item.code+'_'+techCode);
  	var ids=idArray.join(',');
  	dataStock.getState(ids,techCode,function (result) {
  		var items=state.list;
		for (var i = 0; i < items.length; i++) {
			if(!result[items[i].code])
				continue;
			items[i].day=result[items[i].code].day;
			items[i].week=result[items[i].code].week;
			items[i].month=result[items[i].code].month;
			items[i].last_day=result[items[i].code].last_day;
			items[i].last_week=result[items[i].code].last_week;
			items[i].last_month=result[items[i].code].last_month;
		};
  		me.dispatch(items);
  		callback&&callback();
  	}); 	
  }
  loadFailed(errorMessage){
  	this.dispatch(errorMessage);
  }
  setLoading(isLoading){
  	this.dispatch(isLoading);
  }
}
module.exports = alt.createActions(RecoActions); ;  

