'use strict';

import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var MyObjectList = require('./object/myObjectList');
var Titlebar=require('./control/titlebar');
var IconButton=require('./control/button');
var {
  ToolbarAndroid
}=require('react-native-android-lib');

var myStockAction=require('../actions/myStockAction');
var ObjectAdd=require('./object/add');
var Nav=require('./nav');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var {ColorConfig}=require('../config');
var ViewPagerBar=require('./control/viewPageBar')

var Main = React.createClass({
  getInitialState: function() {
    return {
      visible: false
    };
  },
  componentWillMount: function() {
 
  },
  onOpenMenu:function (argument) {
    Nav.openMenu()
  },
  onOpenAdd:function (argument) {
    Nav.open(<ObjectAdd/>)
  },
  onEdit:function (argument) {
    myStockAction.removeAll();
  },
  onOpenMore:function (argument) {
    
  },
  renderTabBar:function (props) {
    return <ViewPagerBar       
          renderRightTool={this.renderRightTool}
          renderLeftTool={this.renderLeftTool}
          {...props}/>;
  },
  renderLeftTool:function (argument) {
    return  <IconButton  onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"WHITE"}/>;
  },
  renderRightTool:function (argument) {
    return <IconButton  onPress={this.onOpenAdd} icon={"fontawesome|plus"} color={"WHITE"}/>     
  },
  render: function () {     
    var childs=[];
    if(this.props.visible){
      childs.push(<MyObjectList key={'cycle_myobjectlist'}/>);
    }else{
      childs.push(<View key={'cycle_loading'} style={{flex:1,justifyContent:'center',alignItems:'center'}}></View>);
    }

    return (
      <View style={ styles.container } >
        <Titlebar>
          <IconButton onPress={this.onOpenMenu} icon={"fontawesome|navicon"} color={"#FFFFFF"}/>
          <View style={{flex:1}}></View>      
          <IconButton  onPress={this.onOpenAdd} icon={"fontawesome|plus"} color={"#FFFFFF"}/>     
        </Titlebar>
        {childs}
      </View>
    );
  }
});

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

        // <ScrollableTabView 
        //   style={styles.container}
        //   initialPage={0}
        //   renderTabBar={this.renderTabBar}
    
        //   onPageSelected={this.onPageSelected}
        //   tabBarUnderlineColor={'#ffffff'}
        //   tabBarActiveTextColor={'#ffffff'}
        //   tabBarBackgroundColor={ColorConfig.baseColor}
        //   ref={viewPager => { this._viewPager = viewPager; }}>
        //     <View tabLabel={"关注"}  style={{flex:1}}>              
        //       {childs}
        //     </View>
        //     <View tabLabel={"排行"} style={{flex:1}}>             
              
        //     </View>
        // </ScrollableTabView >


module.exports = Main;
