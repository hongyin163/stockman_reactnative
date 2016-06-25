'use strict';
var React = require('react-native');
var TextButton=require('../control/button');
var Titlebar=require('../control/titlebar');
var IconButton=require('../control/button');
var PriceInfo=require('./objectInfo');
// var KChart=require('../chart/kchart');
var TechChartList=require('../chart/techChartList');
var CandleChart=require('../chart/candleChart');
var CycleBar=require('../chart/cycleBar');
var StockItemStore=require('../../stores/objectPriceStore');
var StockRecoStore=require('../../stores/stockRecoStore');
var objectAction=require('../../actions/objectAction');
var myStockAction=require('../../actions/myStockAction');

var DataAdapter=require('../chart/techDataAdapter');
var {ColorConfig}=require('../../config');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var ViewPagerBar=require('../control/viewPageBar');
var StockList=require('../stock/stockList');
var Nav=require('../nav');
var myObjectStore=require('../../stores/myObjectStore');
var TimerMixin = require('react-timer-mixin');
var Loading=require('../control/loading');
var {
	CombinedChart
}=require('react-native-chart-android');

var {
  Image,
  ListView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  NativeAppEventEmitter,
  Animated,
  ScrollView,
  InteractionManager,
  PanResponder,
  Dimensions,
} = React;



var KChart = React.createClass({
	getInitialState:function(){
		var me=this;
		var state={
			code:this.props.code,
			name:this.props.name,
	    	cycle:this.props.cycle,
	    	type:this.props.type,
	        price:{},
	        techCodeList:me.getTechCodeList(),
	        top:new Animated.Value(100),
	        priceTop:new Animated.Value(0),
	        recomendList:[]
	    };
	    state.price[state.cycle]=[];
	    return state;
	},

	componentDidMount:function(){
		StockItemStore.listen(this.onChange);
		var me=this;
		InteractionManager.runAfterInteractions(() => {
		 	objectAction.loadPriceData(me.props.code,me.props.cycle,me.props.type);
		});	
	},
	componentWillUnmount:function(){
		StockItemStore.unlisten(this.onChange);
	},
	getTechCodeList:function (argument) {
		var techLibs=DataAdapter.getAll();
		var techs=[];
		for(var pro in techLibs){
		  techs.push({code:pro,name:techLibs[pro].name});
		}
		return techs;
	},
	onChange:function(state) {	
		this.setState(state);
	},
	onCycleSelect:function(cycle,name){	
		objectAction.loadPriceData(this.props.code,cycle,this.props.type);
	},
	_offset:0,
	_isZoom:false,
	onScroll:function (e) {
		// debugger;
		var me=this;
		if(e.nativeEvent.contentOffset.y>this._offset){
			if(!this._isZoom){
				Animated.parallel([
					Animated.timing(
			         	this.state.top,         // Auto-multiplexed
				         {
				            toValue: 0,
				            friction: 9,
				            tension:70
				         },
			    	),
			    	Animated.timing(
			         	this.state.priceTop,         // Auto-multiplexed
				         {
				            toValue: -50,
				            friction: 9,
				            tension:70
				         },
			    	)
				]).start(()=>{
					// me._scrollView.scrollTo(20);
				});
				this._isZoom=true;
			}
		}else{
			if(e.nativeEvent.contentOffset.y>=0&&e.nativeEvent.contentOffset.y<30){
				if(this._isZoom){
			      	Animated.parallel([
					Animated.timing(
			         	this.state.top,         // Auto-multiplexed
				         {
				            toValue: 100,
				            friction: 9,
				            tension:70
				         },
			    	),
			    	Animated.timing(
			         	this.state.priceTop,         // Auto-multiplexed
				         {
				            toValue: 0,
				            friction: 9,
				            tension:70
				         },
			    	)
					]).start();
					this._isZoom=false;
		      	}
			}
		}
		this._offset=e.nativeEvent.contentOffset.y;
	},

	render: function() {
		var price=this.state.price[this.state.cycle];
		var childs=[];
		if(price.length==0){
			childs.push(
				<Loading/>
			);
		}else{
			childs.push(
				<View key={'ChartContainer'}  style={{flex:1,overflow:'hidden'}}>
					<Animated.View style={[styles.price,{top:this.state.priceTop}]}>	
						<PriceInfo type={this.state.type} code={this.state.code}/>
					</Animated.View>
					<Animated.View  style={[styles.chart,{top:this.state.top}]}>
						<CycleBar ref={(n)=>this._cycleBar=n} onSelect={this.onCycleSelect}/>
						<ScrollView ref={(n)=>this._scrollView=n} onScroll={this.onScroll} style={styles.kchart}>					
							<CandleChart style={styles.candleChart} data={price}/>													
							<TechChartList style={styles.techChartList}  techs={this.state.techCodeList} data={price}/>							
						</ScrollView>
					</Animated.View>
		        </View>
			);
		}
		return (
			<View style={{flex:1}}>
				{childs}
			</View>
		);
	}
});

var RecommentStock=React.createClass({
	getInitialState: function() {
		return StockRecoStore.getState();
	},
	componentDidMount:function(){
		StockRecoStore.listen(this.onChange);
	},
	componentWillUnmount:function(){
		StockRecoStore.unlisten(this.onChange);
	},
	onChange:function(state) {	
		this.setState(state);
	},
	loadData:function () {
		debugger;
		myStockAction.loadRecommendStock(this.props.code);
	},
	render: function() {
		var recoList=[];
		if(this.state.list.length>0){
			recoList.push(<StockList style={{flex:1}} data={this.state.list}/>)
		}else{
			recoList.push(
				<Loading/>
			);
		}
		return (
			<View style={{flex:1}}>
				{recoList}
			</View>
		);
	}
});

var StockDetail=React.createClass({
	mixins: [TimerMixin],
	getInitialState: function() {
		var me=this;
		return {
	        isMine:me.isMine(me.props.code),
	        code:me.props.code,
	        name:me.props.name,
	        type:me.props.type
		};
	},
	isMine:function(code){
		var items=myObjectStore.getState().list;
        if(!items||items.length==0)
          return false;
        var count=0;
        items.forEach((item)=>{
            if(item.code==code){            
              count++;
            }
        });
        return count>0;
	},
	renderTabBar:function (props) {
		return <ViewPagerBar       
		      renderRightTool={this.renderRightTool}
		      renderLeftTool={this.renderLeftTool}
		      {...props}/>;
	},
	renderLeftTool:function (argument) {
		return <IconButton key={'back'} icon="fontawesome|chevron-left" color="#fff" onPress={()=>Nav.back()}/>;
	},
	// renderRightTool:function (argument) {
	// 	return <IconButton  onPress={this.onOpenAdd} icon={"fontawesome|plus"} color={"WHITE"}/>     
	// },
	renderRightTool:function (argument) {

		var actions=[];
		if(this.state.isMine==null)
			return actions;

		if(this.state.isMine==false)
		{
			actions.push(<IconButton key={'add'}onPress={this.onAdd} icon={"fontawesome|plus"} color={"WHITE"}/> )
		}else{
			actions.push(<IconButton key={'remove'} onPress={this.onRemvoe} icon={"fontawesome|minus"} color={"WHITE"}/> )
		}
		return actions;
	},
	onAdd:function (argument) {		
		var me=this;
		me.setState((state)=>{
			state.isMine=true;
		});	
		InteractionManager.runAfterInteractions(function () {
			objectAction.add({
				code:me.props.code,
				name:me.props.name,
				type:me.props.type,
				symbol:'',
				price:0,
	  			yestclose:0,
			});		
		});

	},
	onRemvoe:function (argument) {
		var me=this;
		me.setState((state)=>{
			state.isMine=false;
		});		
		InteractionManager.runAfterInteractions(function () {
			objectAction.remove(me.props.code);	
		});
	},
	onPageSelected:function (obj) {		
		if(obj.i==1){
			this._recoStock.loadData();
		}
	},
	render: function() {
		
		return (
			<View style={[styles.container,this.props.style]}>
		        <ScrollableTabView 
		          style={styles.container}
		          initialPage={0}
		          renderTabBar={this.renderTabBar}		    
		          onChangeTab={this.onPageSelected}
		          tabBarUnderlineColor={'#ffffff'}
		          tabBarActiveTextColor={'#ffffff'}
		          tabBarBackgroundColor={ColorConfig.baseColor}
		          ref={viewPager => { this._viewPager = viewPager; }}>
		            <View tabLabel={"K线"}  style={{flex:1}}>
				    	<KChart type={this.state.type}  code={this.state.code} name={this.state.name}  cycle={'day'}/>
		            </View>		         
		            <View tabLabel={"推荐"} style={{flex:1}}>             
		           		<RecommentStock ref={(n)=>this._recoStock=n} code={this.state.code} />
		            </View>
		        </ScrollableTabView >
			</View>
		);
	}	
});
   // <View tabLabel={"排行"} style={{flex:1}}>             
		           		
		 //            </View>

var styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
		shadowRadius: 2,
	    shadowColor: 'black',
	    shadowOpacity: 0.2,
	    shadowOffset: {height: 0.5},
	},
	price:{
		height:100
	},
	kchart:{
		flex:1,

	},
	chart:{
		position:'absolute',
      	left:0,top:100,right:0,bottom:0
	},
	candleChart:{
		height:230
	},
	techChartList:{
		height:160
	},
	segmentBtn:{
		height:40,
		backgroundColor:'red'
	}
	
});

module.exports=StockDetail;