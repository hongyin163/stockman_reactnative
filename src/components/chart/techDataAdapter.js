'use strict';
var {
	kdj,
	macd,
	rsi,
	dma,
	trix,
	ma
} = require('./techScript');

var libs={
	'T0001':macd,
	'T0002':kdj,
	'T0003':rsi,
	'T0004':trix,
	'T0005':dma,
	'T0006':ma,
}

class TechDataAdapterFactory{
	static getAdapter(code){
		return libs[code];
	}
	static getAll(){
		return libs;
	}
}
module.exports=TechDataAdapterFactory;