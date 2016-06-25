/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

/// <reference path="./.vscode/typings/react-native/react-native.d.ts" />

'use strict';

var React = require('react-native');

import  Index from './src/index';

var Login=require('./src/components/account/login');

var Filter=require('./src/components/system/filter');


//var ViewPage=require("./src/components/main");
//var BreadBar=require('./src/components/NavigatorExample');
// var TabPanel=require('./src/components/tabPanel');
// var TabButton=require('./src/components/tabButton');
//var {ScrollViewPullToRefresh}=require('react-native-android-lib');
//var MyStockList = require('./src/components/stock/myStockList');
//var layout= require('NativeModules').UIManager.RCTScrollView;

// var Btn=require('./src/components/control/button')
//var Nav=require('./src/components/control/Navigator')

// var Add=require('./src/components/stock/add');
// var Syncdata=require('./src/components/system/syncdata');

//var ChartSample=require('./node_modules/react-native-chart-android/sample/Index')
// var ObjectAdd=require('./src/components/object/add');
// var List=require('./src/List');
//var animation=require('./src/animation');

//var voisesample=require('./node_modules/react-native-voise/sample/index');

// var {
//   BaiduVoise,
//   SpeechRecognizer
// }=require('react-native-voise');

var {
  AppRegistry,
  Text,
  View,
  LayoutAnimation,
  StyleSheet,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions, 
  Animated,
  Navigator,
  TouchableOpacity,
  Dimensions
} = React;
// var SCREEN_WIDTH = Dimensions.get('window').width;
// var App = React.createClass({
//   componentWillMount() {
//     // Animate creation
//     LayoutAnimation.spring();
//   },

//   getInitialState() {
//     return { w: 100, h: 100 }
//   },

//   _onPress() {
//     this.refs['BaiduVoise'].show();
//   },
//   onReceive:function (results) {
//     debugger;
//     this.setState((state)=>{
//       state.result=results[0];
//     });
//   },
//   onChange:function (e) {
//    this.setState((state)=>{
//       state.result=e.result;
//       state.status=e.status;
//       state.value=e.value;
//     });    
//    var v=SCREEN_WIDTH*Number(e.value)/100;
//    this._v.setNativeProps({style:{width:v}});
//   },
//   onFinish:function (e) {
//     this.setState((state)=>{
//       state.result=e.result;
//       state.status=e.status;
//       state.value=e.value;
//     }); 
    
//   },
//   onUpdateResults:function (e) {
//     this.setState((state)=>{
//       state.result=e.result;
//       state.status=e.status;
//       state.value=e.value;
//     }); 
//   },
//   onStartRecording:function (e) {
//     this.setState((state)=>{
//       state.result=e.result;
//       state.status=e.status;
//       state.value=e.value;
//     }); 
//   },
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <View style={{flex:1}}> 
//           <Text>{this.state.result}</Text>
//           <Text>
//             value:{this.state.result},
//             status:{this.state.status},
//             value:{this.state.value}
//           </Text>          
//         </View>   
//         <View style={{height:50,width:SCREEN_WIDTH,backgroundColor:'#e5e5e5',
//           flexDirection:'row',
//           justifyContent:"flex-start",
//           alignItems: 'center',
//         }}>
//             <View ref={(v)=>this._v=v} style={{height:50,width:10,backgroundColor:'red'}}/>
//         </View>    
//         <BaiduVoise 
//           ref={'BaiduVoise'}
//           style={styles.button}
//           api_key={'q0UcNM0glvjekMtBQNWzM92y'} 
//           secret_key={'8hRsMQCQGNdwqnyF8GkWBgr6WObZFT5l'} 
//           onReceive={this.onReceive}>      
//             <Text>点击，说话</Text>
//         </BaiduVoise>        
//         <SpeechRecognizer 
//           ref={'SpeechRecognizer'}
//           api_key={'q0UcNM0glvjekMtBQNWzM92y'} 
//           secret_key={'8hRsMQCQGNdwqnyF8GkWBgr6WObZFT5l'} 
//           onChange={this.onChange}
//           onStartRecording={this.onStartRecording}
//           onFinish={this.onFinish}
//           onUpdateResults={this.onUpdateResults}
//           style={styles.button}>      
//             <Text>点击，说话</Text>
//         </SpeechRecognizer>
//       </View>
//     );
//   }
// });
// var styles=StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     box:{
//         backgroundColor:'red'
//     },
//     button:{
//         height:50,

//     },
//     buttonText:{

//     },
// })



// var Component = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//           <View style={styles.top}></View>
//           <View style={styles.down}></View>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({
//   container:{
//     flex:1
//   },
//   top:{
//     flex:1,
//     backgroundColor:'#333333'
//   },
//   down:{
//     flex:1,
//     backgroundColor:'#111111'
//   }
// });


AppRegistry.registerComponent('stock', () => Index);