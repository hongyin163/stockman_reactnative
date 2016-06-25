'use strict';

var React = require('react-native');
var myStockAction=require('../../actions/myStockAction');
var TextButton=require('../control/button');
var NavAction=require('../../actions/navigationAction');
var StockDetail=require('./stockDetail');
var {
  TouchableHighlight,
  TouchableNativeFeedback,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  NativeAppEventEmitter
} = React;
/*            { name: 'id', type: 'string' },//0
            { name: 'date', type: 'string' },//0
            { name: 'code', type: 'string' },//0
            { name: 'symbol', type: 'string' },//0
            { name: 'type', type: 'string' },//0
            { name: 'name', type: 'string' },//0
            { name: "price", type: 'float' },//0
            { name: "yestclose", type: 'float' },
            { name: "state", type: 'string' },
            { name: "sort", type: 'int' },
            { name: "inhand", type: 'bool' },
            { name: 'day', type: 'int' },
            { name: 'week', type: 'int' },
            { name: 'month', type: 'int' },
            { name: 'last_day', type: 'int' },
            { name: 'last_week', type: 'int' },
            { name: 'last_month', type: 'int' }
*/

var chartConfig={
  chartList=["T0001","T0002","T0003"]
};
var {
  CombinedChart
}=require('react-native-mpchart');
var chartDataLib=require('../chart/techChartDataLib');
var ChartView=React.createClass({
  getInitialState:function() {
      return {
        code:this.props.code,
        name:this.props.name,
        data:this.props.data
      };
  },
  getCharts:function(){
    var {code,name,data}=this.state;
    var charts=[];
  
    if(code=="vol"){
      charts.push(<CombinedChart.Chart key={code} chartType={"candle"} data={chartDataLib.getValumeData(data)} />);   
    }else if(code=='T0001'){
      charts.push(<CombinedChart.Chart  key={code+"line"} chartType={"line"} data={chartDataLib.getMacdData(data).line} />);
      charts.push(<CombinedChart.Chart  key={code+"bar"} chartType={"candle"} data={chartDataLib.getMacdData(data).bar} />)
    }else if(code=='T0002'){
      charts.push(<CombinedChart.Chart key={code+"line"} chartType={"line"} data={chartDataLib.getKdjData(data).line} />)
    }else if(code=='T0003'){
      charts.push(<CombinedChart.Chart key={code+"line"} chartType={"line"} data={chartDataLib.getRsiData(data).line} />)
    }else if(code=='T0004'){
      charts.push(<CombinedChart.Chart key={code+"line"} chartType={"line"} data={chartDataLib.getTrixData(data).line} />)
    }else if(code=='T0005'){
      charts.push(<CombinedChart.Chart key={code+"line"} chartType={"line"} data={chartDataLib.getDmaData(data).line} />)
    }else if(code=='T0006'){
      charts.push(<CombinedChart.Chart key={code+"line"} chartType={"line"} data={chartDataLib.getMaData(data).line} />)
    }
    return charts;
  },
  render() {
    return (
      <CombinedChart 
          style={styles.techChart}      
          touchEnabled={false}        
          maxVisibleValueCount={50} 
              xAxis={{enable:false,drawGridLines:false,gridLineWidth:0}}
              yAxisRight={{enable:false}} 
              yAxis={{startAtZero:false,drawGridLines:false,position:"INSIDE_CHART"}}
              drawGridBackground={false}
              backgroundColor={"WHITE"} 
              description={""}
              legend={{enable:true,position:'BELOW_CHART_LEFT',direction:"LEFT_TO_RIGHT"}}> 
          {this.getCharts()}
        </CombinedChart>
    );
  }
});

var Stock = React.createClass({
  getInitState:function () {
    return this.props.data;
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  onDelete:function(event){
    var id=this.props.data.id;
    myStockAction.remove(id);
  },
  onSetInHand:function (event) {
    var id=this.props.data.id;
    var isInhand=this.state.data.inhand;
    myStockAction.setInHand(id,!isInhand);
  },
  getPercent:function (record) {
    var price = record.price;
    var yestclose = record.yestclose;
    var inhand = record.inhand;
    var subn = Number(price - yestclose);

    var sub = "%";
    var percent = 0;
    if (price > 0 && yestclose > 0) {
        percent = ((subn * 100 / yestclose)).toFixed(2);
        sub = percent + "%";
        if (percent > 0) {
            sub = "+" + sub;
        }
    } else {
        price = yestclose;
        sub = "0%";
    }
    return sub;
  },
  getStateStyle:function(cycle){
    var stock=this.props.data;
    var backColor="";
    if(stock[cycle]==1){
      backColor='#c00';
    }else if(stock[cycle]==0){
      backColor='#ccc';
    }else if(stock[cycle]==-1){
      backColor="#006030";
    }
    var style={
      backgroundColor:backColor,
      width:20,
      height:20,
      marginRight:2
    }
    return style;
  },
  getPercentStyle:function(){
    var stock=this.props.data;
     var backColor="";
    if(stock.price>stock.yestclose){
        backColor="#c00";
    }else{
        backColor="#006030";
    }
    var style={    
      flex:1,
      flexDirection:'row',
      backgroundColor:backColor,
      paddingTop:5,
      paddingBottom:5,
      //width:80,
      justifyContent:'center'
    };
    return style;
  },
  getPriceStyle:function(){
    var stock=this.props.data;
    var backColor="";
    if(stock.price>stock.yestclose){
        backColor="#c00";
    }else{
        backColor="#006030";
    }
    var style={    
      // flexDirection:'row',
      // justifyContent:'center',
      fontWeight:'bold',
      color:backColor
    };
    return style;
  },
  onOpenItem:function(){
      NativeAppEventEmitter.emit('stockDetail',{name:'test'});
      //NavAction.goto({name:'stockDetail',components:(<StockDetail name="stockDetail"/>)})
  },
  getChartList:function(){
      var charts=[];
      chartConfig.map(function(i,item){
        charts.push(<ChartView code={item} name={item} data={}/>)
      });
      return charts;
  },
  render: function() {
    var stock=this.props.data;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.name}>
              <Text>{stock.name}</Text>
              <Text style={{fontSize:11}}>{stock.code}</Text>
          </View>
          <View style={styles.price}>
            <Text style={this.getPriceStyle()}>{stock.price}</Text>
          </View>         
          <View style={this.getPercentStyle()}>
              <Text style={styles.percentText}>{this.getPercent(stock)}</Text>
          </View>        
          <View style={styles.state}>
              <View style={this.getStateStyle('day')}></View>
              <View style={this.getStateStyle('week')}></View>
              <View style={this.getStateStyle('month')}></View>
          </View>
        </View>
        <View style={styles.chart}>
            {this.getChartList()}
        </View>
      </View>
    );
  }
});
              /*      <TextButton text="删除" onPress={this.onSetInHand}/>   
        <TextButton text="删除" onPress={this.onDelete}/> */
var styles = StyleSheet.create({
    container:{

    },
    row: {

      flexDirection:'row',
      padding: 5,
      paddingLeft:10,
      paddingRight:10,
      justifyContent :'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomWidth:1,
      borderBottomColor:'#d9d9d9',
      borderLeftColor:'#c00',
      borderLeftWidth:3
    },    
    percent:{
      backgroundColor:'#c00',
      padding:5,
      paddingRight:10,
      paddingLeft:10,
    },
    percentText:{
      color:'#fff',
      fontWeight:"500"
    },
    state:{
      flex:1,
      flexDirection:'row',
      justifyContent:"center",
      paddingLeft:2
    },
    name:{
      flex:1,
      flexDirection:'column',
      justifyContent:"center",
      alignItems: 'center'
    },
    price:{
      flex:1,
      flexDirection:'row',
      justifyContent:'center'
    },
    chart:{

    }
  });
module.exports=Stock;