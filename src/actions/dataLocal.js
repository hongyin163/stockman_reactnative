'use strict';

var React = require('react-native');
var {
  AsyncStorage,
} = React;

class LocalListStore{
	constructor(key){
		this.key=key;
	}
	save(stocks,callback){
		debugger;
		AsyncStorage.setItem(this.key,JSON.stringify(stocks),function (error) {
			callback&&callback(error);
		});
	}
	get(callback){
		AsyncStorage.getItem(this.key)
		.then((p)=>{
			var result=JSON.parse(p);
			callback&&callback(null,result);
		})
		.catch((error) => {
		    callback&&callback(error,[]);
	  	});
	}
	remove(code,callback){
		var me=this;
		me.get(function (error,stocks) {
			var n=-1;
			stocks.map(function (item,i) {
				if(item.code==code){
					n=i;
				}
			});
			var newList=stocks.splice(n);
			callback&&callback(newList);
		});
	}
	removeAll(callback) {
		AsyncStorage.setItem(this.key,'{}',function (error) {
			callback&&callback(error);
		});
	}
	sync(stocks){
		var me=this;
		var t=setTimeout(function (argument) {
			me.save(stocks);
			clearTimeout(t);
		},100);
	}
}

var user={
	id:'',
	name:'',
	nickname:'',
	image:'',
}
module.exports={
	stockLocal:new LocalListStore('my_stock'),
	objectLocal:new LocalListStore('my_objects'),
	userLocal:new LocalListStore('user_profile'),	
	filterConfig:new LocalListStore('user_filterconfig'),
	techLocal:new LocalListStore('user_techs')
};