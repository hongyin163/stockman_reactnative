'use strict';

var React = require('react-native');

var TextButton=require('./components/control/button');
var TabPanel=require('./components/tabPanel');
var Subscribable = require('Subscribable');
var SideMenu=require('./components/menu');

var Nav=require('./components/nav');
var {
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
} = React;

var DrawerLayout=React.createClass({
  componentWillMount: function() {
    var me=this;
    NativeAppEventEmitter.addListener('openMenu', this.onOpenMenu);
  },
  onOpenMenu:function(){
    this.refs.drawerMenu.openDrawer();   
  },
  onMenuSelect:function (argument) {
    this.refs.drawerMenu.closeDrawer();
  },
  render:function() {
    return (
      <DrawerLayoutAndroid
          ref="drawerMenu"
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => (<SideMenu onMenuSelect={this.onMenuSelect}/>)}>  
          <TabPanel/>
      </DrawerLayoutAndroid>      
    );
  }
});


var Main=React.createClass({
  mixins: [Subscribable.Mixin],
  _onOpenMain:function function_name (argument) {
     var n=this._nav.pop();
  },

  componentDidMount: function() {
    this.addListenerOn(DeviceEventEmitter,
                       'hardwareBackPress',
                       this.onBack);

    BackAndroid.addEventListener('hardwareBackPress', function() {
      //NativeAppEventEmitter.emit('back');
        NativeAppEventEmitter.emit('back');
        
        return false;
    });
    Nav.regist(this._nav);
  },
  render: function() {
    return (    
      <Navigator
            ref={(n)=>this._nav=n}
            debugOverlay={false}
            style={styles.appContainer}
            sceneStyle={styles.sceneStyle}
            configureScene={(route) =>Navigator.SceneConfigs.PushFromRight}
            initialRoute={{component:<DrawerLayout /> }}
            renderScene={(route, navigator) =>route.component}/>
    );
  }
});
var styles = StyleSheet.create({
  appContainer: {
    flex:1
  },
  sceneStyle:{
      shadowRadius: 2,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: {height: 0.5},
  }
});

module.exports=Main;