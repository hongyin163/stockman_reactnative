'use strict';

var React = require('react-native');
var MyStockList = require('./stock/myStockList');
var Titlebar=require('./control/titlebar');
var IconButton=require('./control/button');
var Add=require('./stock/add');
var ObjectAdd=require('./object/add');
var DataApi=require('../actions/dataStock');
var {
  ToolbarAndroid
}=require('react-native-android-lib');

var myStockAction=require('../actions/myStockAction');
var Nav=require('./nav');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeAppEventEmitter
} = React;

var Main = React.createClass({
  componentWillMount: function() {
 
  },
  onOpenMenu:function (argument) {
    Nav.openMenu()
  },
  onOpenAdd:function (argument) {
    Nav.open(<Add/>)
  },
  onEdit:function (argument) {
    myStockAction.removeAll();
    // //Nav.open(<ObjectAdd/>)
    // debugger;
    // DataApi.getPrice('0600100',function (results) {
    //  debugger;
    // });
  },
  onOpenMore:function (argument) {
    
  },
  render: function () {     
    return (
      <View style={ styles.container } >
        <Titlebar>
          <IconButton onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"#FFFFFF"}/>
          <View style={{flex:1}}></View>      
          <IconButton onPress={this.onOpenAdd} icon={"fontawesome|search"} color={"#FFFFFF"}/>     
        </Titlebar>
         <MyStockList key={'MyStockList'}/>          
      </View>
    );
  }
});
   // <IconButton onPress={this.onEdit} icon={"fontawesome|edit"} color={"WHITE"}/>  
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  head: {
    fontSize: 20
  },
  list: {
    height:500,
    width:500
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports= Main;
