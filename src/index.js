'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Animated,
  BackAndroid,
  DrawerLayoutAndroid,
  WebView
} from 'react-native';

var TextButton = require('./components/control/button');
var TabPanel = require('./components/tabPanel');
var Subscribable = require('Subscribable');
var SideMenu = require('./components/menu');
var Nav = require('./components/nav');

import Toast from './components/control/toast';

var DrawerLayout = React.createClass({
  componentDidMount: function () {
    var me = this;
    me.unsub = NativeAppEventEmitter.addListener('openMenu', () => {
      me.onOpenMenu();
    });
  },
  componentWillUnmount: function () {
    var me = this;
    me.unsub.remove();
  },
  componentWillMount: function () {

  },
  onOpenMenu: function () {
    debugger;
    this.drawerMenu.openDrawer();
  },
  onMenuSelect: function (argument) {
    this.drawerMenu.closeDrawer();
  },
  render: function () {
    debugger;
    return (
      <DrawerLayoutAndroid
        ref={(n) => this.drawerMenu = n}
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => (<SideMenu onMenuSelect={this.onMenuSelect} />)}>
        <TabPanel />
      </DrawerLayoutAndroid>
    );
  }
});


var Main = React.createClass({
  mixins: [Subscribable.Mixin],
  _onOpenMain: function function_name(argument) {
    var n = this._nav.pop();
  },

  componentDidMount: function () {
    var me = this;

    Nav.regist(this._nav);
    var clickCount = 0;
    BackAndroid.addEventListener('hardwareBackPress', () => {

      var nav = me._nav;
      var state = nav.state;
      var routeStack = state.routeStack;
      if (routeStack.length == 1) {
        if (clickCount == 0) {
          Toast.show('再按一次退出慢牛');
          clickCount++;
          var timer = setTimeout(() => {
            clickCount = 0;
            clearTimeout(timer);
          }, 1500);
          return true;
        } else if (clickCount >= 1) {
          BackAndroid.exitApp();
          return false;
        }
      } else {
        Nav.back();
        return true;
      }
    });

  },
  render: function () {
    return (
      <Navigator
        ref={(n) => this._nav = n}
        debugOverlay={false}
        style={styles.appContainer}
        sceneStyle={styles.sceneStyle}
        configureScene={(route) => Navigator.SceneConfigs.PushFromRight}
        initialRoute={{ name: 'main', component: <DrawerLayout /> }}
        renderScene={(route, navigator) => route.component} />
    );
  }
});
var styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  sceneStyle: {
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { height: 0.5 },
  }
});

module.exports = Main;