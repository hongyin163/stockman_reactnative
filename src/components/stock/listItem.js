'use strict';

var React = require('react-native');

var TextButton=require('../control/button');
var NavAction=require('../../actions/navigationAction');
var StockDetail=require('./stockDetail');
var TechChart=require('../chart/techChart');
var myStockAction=require('../../actions/myStockAction');
var TechBar=require('../chart/techBar');
var Nav=require('../nav');
var TechChartListAllCycle=require('../chart/techChartListAllCycle');
var Loading = require('../control/loading');
var {
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  NativeAppEventEmitter,
  PropTypes,
  PanResponder,
  Animated,
  Dimensions,
  InteractionManager
} = React;
var SCREEN_WIDTH = Dimensions.get('window').width;
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
var TechChartList=React.createClass({
  propTypes: {
    code:PropTypes.string,
    name:PropTypes.string,
    techCode:PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      code:'',
      name:'',
      techCode:'T0001'
    };
  },
  getInitialState:function(){
    var state={
        isLoad:false,
        code:this.props.code,
        name:this.props.name,
        techCode:this.props.techCode,
        price:{'day':[],'week':[],'month':[]},
        techPanelHeight:new Animated.Value(0),
        chartPanelTop:new Animated.Value(0),
      };
      state.price[state.cycle]=[];
      return state;
  },
  componentDidMount:function(){
    //StockItemStore.listen(this.onChange);
    // var me=this;
    // setTimeout(function(){
    //   myStockAction.loadPriceData(me.props.code,me.props.cycle);
    // },500);   
  },
  componentWillUnmount:function(){
    //StockItemStore.unlisten(this.onChange);
  },  
  onChange:function(state) {    
    //this.setState(state);
  },
  _hidden:false,
  loadData:function(code){
    var me=this;
    var state=this.state;

    if(state.isLoad==false){

        Animated.spring(
           this.state.techPanelHeight,         // Auto-multiplexed
           {
              toValue: 280,
              friction: 9,
              tension:70
           },

        ).start(function (argument) {
          // state.price['day']=myStockAction.getKDataAllCycle(code,'1')
          // state.price['week']=myStockAction.getKDataAllCycle(code,'week')
          // state.price['month']=myStockAction.getKDataAllCycle(code,'month');
          myStockAction.loadKDataAllCycle(code,'1',(data)=>{
            debugger;
            me._hidden=false;
            state.price=data;
            state.isLoad=true;
            me.setState(state);              
          });
       // body...
        });

    }else{    
      if(me._hidden==true){
        Animated.parallel([
          Animated.spring(
                this.state.techPanelHeight,         // Auto-multiplexed
                 {
                    toValue: 280,
                    friction: 9,
                    tension:70
                 },
            ),
            Animated.spring(
                this.state.chartPanelTop,         // Auto-multiplexed
                 {
                    toValue: 0,
                    friction: 9,
                    tension:70
                 },
            )
        ]).start(()=>{
          me._hidden=false;
        });    
        me._hidden=false;
      }
      else{
        Animated.parallel([
          Animated.spring(
                this.state.techPanelHeight,         // Auto-multiplexed
                 {
                    toValue: 0,
                    friction: 9,
                    tension:70
                 },
            ),
            Animated.spring(
                this.state.chartPanelTop,         // Auto-multiplexed
                 {
                    toValue: -280,
                    friction: 9,
                    tension:70
                 },
            )
        ]).start(()=>{
          me._hidden=true;
        });
        me._hidden=true;
      }

            

    }
    
  },
  onTechSelect:function(code,name){
    var state=this.state;
    state.techCode=code;
    this.setState(state);
  },
  onNext:function (argument) {
    this._techBar.next();
  },
  render:function(){
    var charts=[];
 
    var childs=[];
    if(this.state.isLoad==true){
      childs.push(<TechChartListAllCycle key={'TechChartListAllCycle'}  style={{height:240}} onPress={this.onNext} code={this.state.techCode}  data={this.state.price}/> );
      childs.push(<TechBar key={'TechBar'} ref={(n)=>this._techBar=n} style={{height:40,flex:1}} includeVol={false} onSelect={this.onTechSelect}/>);     
    }else{     
      childs.push(<Loading/>)
    }
    return (
      <Animated.View style={[{overflow:'hidden'},this.props.style,{height:this.state.techPanelHeight}]}>   
          <Animated.View style={{position:'absolute',left:0,right:0,bottom:0,top:this.state.chartPanelTop}}>
            {childs}
          </Animated.View>   
      </Animated.View>
    );
  }
});

var Stock = React.createClass({ 
  getInitialState:function () {
    return {
      data:this.props.data
    };
  },
  _panResponder: {},
  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder:(evt, gestureState)=>false,// this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: (evt, gestureState)=>false,
      onMoveShouldSetPanResponderCapture:this._handleMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture:(evt, gestureState)=>false,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousRight= 0;
    this._direction='';
    // this._previousTop = 84;
    this._rowViewStyle = {
      style: {
        right: new Animated.Value(this._previousRight)
      }
    };
    this._openTech=false;
  },
  _updatePosition: function() {
    //console.log(this._rowViewStyle.style.right);
    //this._rowView && this._rowView.setNativeProps(this._rowViewStyle);
    //this._previousRight.setValue()
  },
   _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {    

       return false;
  },
  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    if(Math.abs(gestureState.dx)/Math.abs(gestureState.dy)>2)
      return true;
    else
      return false;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    //this._highlight();
    //console.log('gestrue');
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    //console.log('gestrue');
    //console.log(Math.abs(gestureState.dx)/Math.abs(gestureState.dy));
    if(Math.abs(gestureState.dx)/Math.abs(gestureState.dy)>2){
      var right=this._previousRight -gestureState.dx;
      if(right>=0&&right<=180){
          if(this._rowViewStyle.style.right._value>right){
              this._direction='right';
          }else{
              this._direction='left';
          }
          //this._rowViewStyle.style.right = this._previousRight -gestureState.dx;
          this._rowViewStyle.style.right.setValue(right);
          this._updatePosition();
      }
    }
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {

    if(this._direction=='left'){
      Animated.spring(
         this._rowViewStyle.style.right,         // Auto-multiplexed
         {
            toValue: 180,
            friction: 9,
            tension:70
         },

      ).start();
      this._previousRight=180;
    }else{
      Animated.spring(
         this._rowViewStyle.style.right,         // Auto-multiplexed
         {
            toValue: 0,
            friction: 9,
            tension:70
         } 
      ).start();
      this._previousRight=0;
    }
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
    var backColor="#e3e3e3";
    if(stock[cycle]==1){
      backColor='#cc0000';
    }else if(stock[cycle]==0){
      backColor='#cccccc';
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
    // $up2-color:#cc0000;
    // $up1-color:#FF6666;
    // $down1-color:#99CC66;
    // $down2-color:#006030;
    var stock=this.props.data;
     var backColor="";
    var percent=Number(stock.price - stock.yestclose)/stock.price;
    if(stock.price>=stock.yestclose){
        if(percent>=0&&percent<=0.03)
          backColor="#FF6666";
        else
          backColor="#cc0000";
    }else{
        if(percent<0&&percent>=-0.03)
          backColor="#99CC66";
        else
          backColor="#006030";
    }
    var style={    
      flex:1,
      flexDirection:'row',
      backgroundColor:backColor,
      //width:80,
      margin:10,
      justifyContent:'center',
      alignItems: 'center'
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
  getInHandStyle:function () {
      var style={
        borderLeftColor:'#cc0000',
        borderLeftWidth:3,
      }    
      if(this.props.data.inhand==true){
          return style;
      }
      return {
        borderLeftWidth:0
      }
  },
  onOpenItem:function(){
      // NativeAppEventEmitter.emit('nav',{
      //   name:'stockDetail',
      //   component:StockDetail,
      //   props:{
      //     name:this.props.data.name,
      //     code:this.props.data.code,
      //     cycle:'day'
      //   }
      // });  

      // Nav.open({
      //   name:'stockDetail',
      //   component:StockDetail,
      //   props:{
      //     name:this.props.data.name,
      //     code:this.props.data.code,
      //     cycle:'day'
      //   }
      // })
    Nav.open(<StockDetail name={this.props.data.name} code={this.props.data.code} cycle={"day"}/>);
  },  
  onOpenTechChart:function(){
    // console.log('loadPriceData');
    var me=this;
    me._techList.loadData(me.props.data.code);

  },
  onSetInMyHand:function(){
    this._rowViewStyle.style.right.setValue(0);
    myStockAction.setInHand(this.props.data.code,!this.props.data.inhand);
  },
  onSetTop:function () {
    this._rowViewStyle.style.right.setValue(0);
    myStockAction.setTop(this.props.data.code);
  },
  onRemove:function(){
    myStockAction.remove(this.props.data.code);
  },
  render: function() {
    var stock=this.props.data;

    return (    
        <View style={styles.container}>
          <View style={styles.slideWin}>

              <View style={styles.slideBtn2}>
                <TextButton onPress={this.onSetInMyHand} text={(()=>stock.inhand==true?'标为空仓':'标为持仓')()} color={'black'} />
              </View>
              <View style={styles.slideBtn}>                
                <TextButton onPress={this.onSetTop} text={'置顶'} color={'black'} />
              </View>
              <View style={styles.slideBtn}>                
                <TextButton onPress={this.onRemove} text={'删除'} color={'black'} />
              </View>
          </View>
          <Animated.View {...this._panResponder.panHandlers} ref={(control)=>this._rowView=control} style={[styles.row,this.getInHandStyle(),{right:this._rowViewStyle.style.right}]}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
              onPress={this.onOpenItem}>
              <View  style={styles.info}>
                <View style={styles.name}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>{stock.name}{stock.sort}</Text>
                    <Text style={{fontSize:11}}>{stock.code}</Text>
                </View>
                <View style={styles.price}>
                  <Text style={this.getPriceStyle()}>{stock.price}</Text>
                </View>         
                <View style={this.getPercentStyle()}>
                    <Text style={styles.percentText}>{this.getPercent(stock)}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>   
        
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
              onPress={this.onOpenTechChart}>    
              <View   style={styles.state}>
                  <View style={this.getStateStyle('day')}></View>
                  <View style={this.getStateStyle('week')}></View>
                  <View style={this.getStateStyle('month')}></View>
              </View>
            </TouchableNativeFeedback>   
          </Animated.View>
         
          <TechChartList ref={(control)=>this._techList=control} code={this.props.data.code}/>
      </View> 
    );
  }
});

//  
var styles = StyleSheet.create({
    container:{
      flexDirection:'column',
    },
    row: {
      flexDirection:'row',
      //padding: 5,
      height:50,
      justifyContent :'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderTopWidth:1,
      borderTopColor:'#d9d9d9',

      borderRightColor:'#d9d9d9',
      borderRightWidth:1
    },
    info:{
      paddingLeft:10,
 
      height:50,
      flexDirection:'row',
      flex:3
    },
    techChart:{
      height:80
    },
    percent:{
      backgroundColor:'#c00',
      // paddingTop:10,
      // paddingBottom:10,
      paddingRight:10,
      paddingLeft:10,
    },
    percentText:{
      color:'#fff',
      fontWeight:"500"
    },
    state:{
      height:50,
      flex:1,
      flexDirection:'row',
      justifyContent:"center",
      alignItems: 'center',
      paddingLeft:2,
      paddingRight:10,
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
      justifyContent:'center',
      alignItems: 'center',
      marginTop:10,
      marginBottom:10,
    },
    slideWin:{
      position:'absolute',
      left:0,top:0,right:0,bottom:0,
      flexDirection:'row',
      justifyContent :'flex-end',
      borderTopWidth:1,
      borderTopColor:'#d9d9d9',
    },
    slideBtn:{
      width:50,
      height:50,
      flexDirection:'row',
      justifyContent :'center',
      alignItems: 'center'
    },
     slideBtn2:{
      width:80,
      height:50,
      flexDirection:'row',
      justifyContent :'center',
      alignItems: 'center'
    },
    setTop:{
      
    },
    setRemove:{

    },
    techPanel:{
      overflow:'hidden'
    }
  });
module.exports=Stock;