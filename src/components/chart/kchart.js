
import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  InteractionManager 
} from 'react-native';

var StockItemStore=require('../../stores/stockPriceStore');
var myStockAction=require('../../actions/myStockAction');
var TechBar=require('./techBar');
var CycleBar=require('./cycleBar');
var TechChart = require('./techChart');
var {ColorConfig}=require('../../config');
var {
	CombinedChart
}=require('react-native-chart-android');

var chart = React.createClass({
	getInitialState:function(){
		var state={
			code:this.props.code,
	    	cycle:this.props.cycle,
	    	techCode:'vol',
	        price:{}
	    };
	    state.price[state.cycle]=[];
	    return state;
	},
	componentDidMount:function(){
		StockItemStore.listen(this.onChange);
		var me=this;
		InteractionManager.runAfterInteractions(() => {
		 	myStockAction.loadPriceData(me.props.code,me.props.cycle);
		});	
	},
	componentWillUnmount:function(){
		StockItemStore.unlisten(this.onChange);
	},  
	onChange:function(state) {		
		this.setState(state);
	},
	getData:function(){
		var price=this.state.price[this.state.cycle];
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
	onCycleSelect:function(cycle,name){
		
		myStockAction.loadPriceData(this.props.code,cycle);

	},
	onTechSelect:function(code,name){
		this.state.techCode=code;
		this.setState(this.state);
	},
	render: function() {
		var price=this.state.price[this.state.cycle];
		if(price.length==0)
			return (<View style={styles.container}></View>);

		var {
			kdata,
			avgData,
			volumeData,
			range
		}=this.getData();

		return (
			<View style={styles.container}>
				<View style={styles.kChart}>
				    <CycleBar style={styles.segmentBtn} onSelect={this.onCycleSelect}/>
					<CombinedChart 
						style={styles.cnadleChart} 
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
				</View>
				<TechChart ref={'techChart'} enableLegend={true} style={styles.techChart} code={this.state.techCode} data={price}/>	
				<TechBar style={styles.techBtn} onSelect={this.onTechSelect}/>				    	
			</View>
		);
	}
});
				// <View style={styles.techChart}>					
				// 	<CombinedChart 
				// 		style={styles.techChart} 
				// 		visibleXRange={range}						
				// 		maxVisibleValueCount={50} 
				//         xAxis={{enable:false,drawGridLines:false,gridLineWidth:0}}
				//         yAxisRight={{enable:false}} 
				//         yAxis={{startAtZero:false,drawGridLines:false,position:"INSIDE_CHART"}}
				//         drawGridBackground={false}
				//         backgroundColor={"WHITE"} 
				//         description={""}
				//         legend={{enable:false}}>	
				// 		<CombinedChart.Chart chartType={"candle"} data={volumeData} />
				// 	</CombinedChart>
				//     <TechBar style={styles.techBtn} onSelect={this.onTechSelect}/>
				// </View>
var styles=StyleSheet.create({
	container:{
		flex:1
	},
	kChart:{
		flex:2
	},
	cnadleChart:{
		flex:1,
	},
	techChart:{
		flex:1
	},
	segmentBtn:{
		flexDirection:'row',
		padding:5,
		backgroundColor:'#F3F3F3',
		height:40
	},
	scrollView:{
		height:40,
		paddingBottom:0
	},
	segmentContainer:{
		flex:1,
		flexDirection:'row',
		borderRadius:5,
		backgroundColor:'blue'
	},
	techBtn:{
		flexDirection:'row',
		height:40,
		padding:5,
	},
	segmentBtnItem:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		marginRight:1
	},
	segmentBtnText:{
		color:'#ffffff'
	},
	segmentBtnItemPressed:{

	},
	segmentBtnItemFocus:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:ColorConfig.segmentBtn.focus,
		marginRight:1,
		borderRadius:5
	},
	segmentBtnItemLast:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		marginRight:1
	},
	moreBtn:{
		width:60
	},
	techPanel:{
		height:80,
		width:80,
		position:'absolute',
		bottom:50,
		right:50,
		opacity:1,
		overflow:'visible',
		backgroundColor:'#ffffff',
	}
});
module.exports=chart;