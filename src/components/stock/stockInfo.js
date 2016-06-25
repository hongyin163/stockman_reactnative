/* @flow */
'use strict';

var React = require('react-native');
var {ColorConfig}=require('../../config');
var myStockAction=require('../../actions/myStockAction');
var StockItemStore=require('../../stores/stockInfoStore');
var {
  StyleSheet,
  View,
  Text,
  InteractionManager 
} = React;

var PriceInfo = React.createClass({
	getInitialState:function() {
	    return {
	    	isLoading:true,
	    	data:null
	    };
	},
	componentWillUnmount:function(){
		StockItemStore.unlisten(this.onChange);
	},
	componentDidMount:function(){
		var me=this;
		StockItemStore.listen(this.onChange);
		InteractionManager.runAfterInteractions(() => {
			console.log(this.props.code);
			myStockAction.loadStockInfo(this.props.code);
		});	
	},
	onChange:function(state) {		
		this.setState(state);
	},
	getPricePercentage: function (values) {
	 if (values.percent > 0)
	     return <Text key={"percent"} style={styles.percentUp}>+{values.percent}%</Text>;
	 else
	     return <Text key={"percent"} style={styles.percentDown}>{values.percent}%</Text>;
	},
	getPriceChange: function (values) {
		var views=[];
		if (values.updown > 0){
			views.push(<Text key={"price"} style={styles.priceUp}>{values.price} </Text>);
			views.push(<Text key={"updown"} style={styles.priceUp}>+{values.updown}</Text>);	  	
		}
		else{
			views.push(<Text key={"price"} style={styles.priceDown}>{values.price }</Text>);
			views.push(<Text key={"updown"} style={styles.priceDown}>{values.updown}</Text>);  	
		}
		return views;
	},
	getVolume: function (values) {
		if (values.volume > 100000000)
		 return (values.volume / 100000000).toFixed(1) + '亿';
		if (values.volume > 10000)
		 return (values.volume / 10000).toFixed(1) + '万';
		return values.volume;
	},
	getTurnover: function (values) {
		if (values.turnover > 100000000)
		 return (values.turnover / 100000000).toFixed(1) + '亿';
		if (values.turnover > 10000)
		 return (values.turnover / 10000).toFixed(1) + '万';
		return values.turnover;
	},
	getAmplitude: function (values) {
		var value = (values.high - values.low) * 100 / values.yestclose;
	 	return value.toFixed(2);
	},
	// getCatePercentage: function (values) {
	//  if (values.bid3 > 0)
	//      return "<span class='up'>+" + values.bid3 + "%<span>";
	//  else
	//      return "<span class='down'>" + values.bid3 + "%<span>";
	// },
  render: function() {
  	if(this.state.data==null)
  		return (<View style={styles.container}></View>);
  	var data=this.state.data;
    return (
      	<View style={styles.container}>	
			<View style={styles.priceRow}>
				<View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',paddingRight:5}}>
					<View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>						
						{this.getPricePercentage(data)}
					</View>					
					<View>
						{this.getPriceChange(data)}
					</View>
				</View>
				<View  style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingLeft:5}}>
					<Text>行业：医药</Text>
				</View>
			</View>
			<View style={styles.itemRow}>
				<Text style={styles.item}>成交量:{this.getVolume(data)}</Text>
				<Text style={styles.item}>成交额:{this.getTurnover(data)}</Text>
				<Text style={styles.item}>换手率:{data.turnoverrate}</Text>
			</View>
			<View style={styles.itemRow}>
				<Text style={styles.item}>振幅:{this.getAmplitude(data)}</Text>
				<Text style={styles.item}>市净率:{data.pb}</Text>
				<Text style={styles.item}>市盈率:{data.pe}</Text>
			</View>
			<View style={styles.itemRow}>
				<Text style={styles.item}>市值:{data.mv}亿</Text>
				<Text style={styles.item}>流通:{data.fv}亿</Text>
				<Text style={styles.item}></Text>
			</View>		
		</View>
    );
  }
});


var styles = StyleSheet.create({
	container:{
		flex:1,
		flexDirection:'column'
	},
	priceRow:{
		flex:1.5,
		flexDirection:'row',
		padding:3,
	},
	itemRow:{
		flex:1,
		flexDirection:'row',
		padding:3
	},
	item:{
		flex:1
	},
	percentUp:{
		fontSize:30,
		color:ColorConfig.candle.up
	},
	percentDown:{
		fontSize:30,
		color:ColorConfig.candle.down
	},
	priceUp:{
		width:50,
		fontSize:15,
		color:ColorConfig.candle.up,
		textAlign:'center'
	},
	priceDown:{
		fontSize:15,
		color:ColorConfig.candle.down
	}

});


module.exports = PriceInfo;
