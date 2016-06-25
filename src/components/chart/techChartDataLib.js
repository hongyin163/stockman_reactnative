/* @flow */
'use strict';
var {
	kdj,
	macd,
	rsi,
	dma,
	trix,
	ma
} = require('./techScript');

var techDataLib={
	getKdjData:function(price){
		//var price=this.state.data;
		//var allData=price.slice(price.length-50,price.length);
		var allData=kdj.calculate(price);
		allData=allData.slice(allData.length-50,allData.length);
		var range=[50,100]
		var avgData={
			xValues:[],
			yValues:[
				{
					data:[],
					label:"K",
					config:{
						drawCircles:false,
						color:'#FF0080'
					}
				},
				{
					data:[],
					label:"D",
					config:{
						drawCircles:false,
						color:'#E1E100'
					}
				},
				{
					data:[],
					label:"J",
					config:{
						drawCircles:false,
						color:'#3D7878'
					}
				}
			]	
		}
		for (var i = 0; i < allData.length; i++) {

			//allData[i][0]=allData[i][0].substring(4);

			avgData.xValues.push(allData[i][0]);
			avgData.yValues[0].data.push(allData[i][1]);
			avgData.yValues[1].data.push(allData[i][2]);
			avgData.yValues[2].data.push(allData[i][3]);
		};
		return {line:avgData};
	},
	getMacdData:function(price){
		//var price=this.state.data;
		//var allData=price.slice(price.length-50,price.length);
		var allData=macd.calculate(price);// this.getData('T0001',price);
		allData=allData.slice(allData.length-50,allData.length);
		var range=[50,100];
		var barData={
			data:[],
			label:"bar",
			config:{
				visbleRange:range,
				color:'WHITE',
				decreasingColor:ColorConfig.candle.down,
				decreasingPaintStyle:"FILL",
				increasingColor:ColorConfig.candle.up,
				increasingPaintStyle:"FILL"
			}
		};
		var lineData={
			xValues:[],
			yValues:[
				{
					data:[],
					label:"DIFF",
					config:{
						drawCircles:false,
						color:'#FF0080'
					}
				},
				{
					data:[],
					label:"DEA",
					config:{
						drawCircles:false,
						color:'#E1E100'
					}
				}
			]	
		}
		for (var i = 0; i < allData.length; i++) {
			lineData.xValues.push(allData[i][0]);
			lineData.yValues[0].data.push(allData[i][1]);
			lineData.yValues[1].data.push(allData[i][2]);
			
			if(allData[i][3]>0){
				barData.data.push([allData[i][0],0,allData[i][3],allData[i][3],0])
			}else{
				barData.data.push([allData[i][0],0,allData[i][3],0,allData[i][3]])
			}
		};
		return {
			line:lineData,
			bar:barData
		};
	},
	getRsiData:function(price){
		//var price=this.state.data;
		//var allData=price.slice(price.length-50,price.length);
		var allData=rsi.calculate(price);// this.getData('T0001',price);
		allData=allData.slice(allData.length-50,allData.length);
		var range=[50,100];
		var lineData={
			xValues:[],
			yValues:[
				{
					data:[],
					label:"6",
					config:{
						drawCircles:false,
						color:'#FF0080'
					}
				},
				{
					data:[],
					label:"12",
					config:{
						drawCircles:false,
						color:'#E1E100'
					}
				},
				{
					data:[],
					label:"24",
					config:{
						drawCircles:false,
						color:'#3D7878'
					}
				}
			]	
		}
		for (var i = 0; i < allData.length; i++) {
			lineData.xValues.push(allData[i][0]);
			lineData.yValues[0].data.push(allData[i][1]);
			lineData.yValues[1].data.push(allData[i][2]);
			lineData.yValues[2].data.push(allData[i][3]);
		};
		return {
			line:lineData
		};
	},	
	getDmaData:function(price){
	    //var price=this.state.data;
	    //var allData=price.slice(price.length-50,price.length);
	    var allData=dma.calculate(price);// this.getData('T0001',price);
	    allData=allData.slice(allData.length-50,allData.length);
	    var range=[50,100];
	    var lineData={
	      xValues:[],
	      yValues:[
	        {
	          data:[],
	          label:"DDD",
	          config:{
	            drawCircles:false,
	            color:'#FF0080'
	          }
	        },
	        {
	          data:[],
	          label:"AMA",
	          config:{
	            drawCircles:false,
	            color:'#E1E100'
	          }
	        }
	      ] 
	    }
	    for (var i = 0; i < allData.length; i++) {
	      lineData.xValues.push(allData[i][0]);
	      lineData.yValues[0].data.push(allData[i][1]);
	      lineData.yValues[1].data.push(allData[i][2]);
	    };
	    return {
	      line:lineData
	    };
	  },
	getTrixData:function(price){
	    //var price=this.state.data;
	    //var allData=price.slice(price.length-50,price.length);
	    var allData=trix.calculate(price);// this.getData('T0001',price);
	    allData=allData.slice(allData.length-50,allData.length);
	    var range=[50,100];
	    var lineData={
	      xValues:[],
	      yValues:[
	        {
	          data:[],
	          label:"TRIX",
	          config:{
	            drawCircles:false,
	            color:'#FF0080'
	          }
	        },
	        {
	          data:[],
	          label:"TRMA",
	          config:{
	            drawCircles:false,
	            color:'#E1E100'
	          }
	        }
	      ] 
	    }
	    for (var i = 0; i < allData.length; i++) {
	      lineData.xValues.push(allData[i][0]);
	      lineData.yValues[0].data.push(allData[i][1]);
	      lineData.yValues[1].data.push(allData[i][2]);
	    };
	    return {
	      line:lineData
	    };
	  },
	getMaData:function(price){
	    //var price=this.state.data;
	    //var allData=price.slice(price.length-50,price.length);
	    var allData=ma.calculate(price);
	    allData=allData.slice(allData.length-50,allData.length);
	    var range=[50,100]
	    var lineData={
	      xValues:[],
	      yValues:[
	        {
	          data:[],
	          label:"5",
	          config:{
	            drawCircles:false,
	            color:'#FF0080'
	          }
	        },
	        {
	          data:[],
	          label:"10",
	          config:{
	            drawCircles:false,
	            color:'#E1E100'
	          }
	        },
	        {
	          data:[],
	          label:"20",
	          config:{
	            drawCircles:false,
	            color:'#3D7878'
	          }
	        },
	        {
	          data:[],
	          label:"60",
	          config:{
	            drawCircles:false,
	            color:'#FF8000'
	          }
	        }
	      ] 
	    }
	    for (var i = 0; i < allData.length; i++) {
	      lineData.xValues.push(allData[i][0]);
	      lineData.yValues[0].data.push(allData[i][1]);
	      lineData.yValues[1].data.push(allData[i][2]);
	      lineData.yValues[2].data.push(allData[i][3]);
	      lineData.yValues[3].data.push(allData[i][4]);
	    };
	    return {
	      line:lineData
	    };

	  }
}

module.exports = techDataLib;
