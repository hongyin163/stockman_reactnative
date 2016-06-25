var React=require('react-native');

var {ColorConfig}=require('../../config');
var {
	CombinedChart
}=require('react-native-chart-android');

var {
  StyleSheet,
  View,
  Text,
  PropTypes
} = React;

var chart = React.createClass({
	propTypes: {
	    data:PropTypes.array,
	},
	getInitialState:function(){
		var state={
	        price:this.props.data
	    };
	    return state;
	},
	getData:function(){
		var price=this.props.data;
		var allData=price.slice(price.length-50,price.length);
		var range=[50,100]
		var kdata={
			data:allData,
			label:"",
			config:{
				visbleRange:range,
				color:'WHITE',
				shadowColor:"GRAY",
				shadowWidth:1,
				decreasingColor:ColorConfig.candle.down,
				decreasingPaintStyle:"FILL",
				increasingColor:ColorConfig.candle.up,
				increasingPaintStyle:"FILL"
			}
		}

		var volumeData={
			data:[],
			label:"",
			config:{
				visbleRange:range,
				color:'WHITE',
				decreasingColor:ColorConfig.candle.down,
				decreasingPaintStyle:"FILL",
				increasingColor:ColorConfig.candle.up,
				increasingPaintStyle:"FILL"
			}
		};
		var avgData={
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

			allData[i][0]=allData[i][0].substring(4);
			//open>close
			if(allData[i][1]>=allData[i][2]){
				volumeData.data.push([allData[i][0],allData[i][5],0,allData[i][5],0])
			}else{
				volumeData.data.push([allData[i][0],0,allData[i][5],allData[i][5],0])
			}

			avgData.xValues.push(allData[i][0]);
			avgData.yValues[0].data.push(allData[i][8]);
			avgData.yValues[1].data.push(allData[i][9]);
			avgData.yValues[2].data.push(allData[i][10]);
			avgData.yValues[3].data.push(allData[i][11]);
		};
		return {
			kdata:kdata,
			avgData:avgData,
			volumeData:volumeData,
			range:range
		};
	},	
	render: function() {
		var price=this.props.data;
		if(price.length==0)
			return (<View style={styles.container}></View>);

		var {
			kdata,
			avgData,
			volumeData,
			range
		}=this.getData();

		return (
			<CombinedChart 
				style={[styles.cnadleChart,this.props.style]} 
				chartPadding={"50 50"}
				touchEnabled={false}
				visibleXRange={range}
				maxVisibleValueCount={50} 
		        xAxis={{drawGridLines:false,gridLineWidth:0,position:"BOTTOM"}}
		        yAxisRight={{enable:false}} 
		        yAxis={{startAtZero:false,drawGridLines:false,position:"INSIDE_CHART"}}
		        drawGridBackground={false}
		        backgroundColor={"WHITE"} 
		        description={""}
		        legend={{enable:true,position:'ABOVE_CHART_LEFT',direction:"LEFT_TO_RIGHT"}}>
				<CombinedChart.Chart chartType={"candle"} data={kdata} />
				<CombinedChart.Chart chartType={"line"} data={avgData} />					
			</CombinedChart>
		);
	}
});
var styles=StyleSheet.create({
	cnadleChart:{
		
	}
});
module.exports=chart;