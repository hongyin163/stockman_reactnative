/* @flow */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  NativeAppEventEmitter,
  Text,
  ToastAndroid
} from 'react-native';

var Button = require('../control/button');
var Titlebar = require('../control/titlebar');
var dataUser=require('../../actions/dataUser');
var UIManager = require('UIManager');
var Nav=require('../nav');
var UserAction=require('../../actions/userAction');
var {
  OAuthLogin
} = require('react-native-android-lib');


var Login = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      password: '',
      nickname: ''
    };

  },
  _login:null,
  onLogin: function (target) {
    OAuthLogin.setConfig({
      'weixin': ['wxb12125f183776372', '95ee719075fceee12615f4d85d59dfd5'],
      'sina': ['1505531472', '88490537c7f79c0ad074254f6367cd28'],
      'qq': ['1103536633', 'oZpzpHzkiFjK8nQ6']
    });
    // this._login.login(target);
    OAuthLogin.login(target,function (data) {
     
      //console.log(data);
      
      dataUser.saveLocalInfo(data);
      // debugger;
      UserAction.updateInfo(data);
      // debugger;
      dataUser.saveSSOAcount(data,
        function (obj) {         

          //ToastAndroid.show('登录成功', ToastAndroid.SHORT);         
          //Nav.back();
        },
        function(error){
            //ToastAndroid.show('登录失败', ToastAndroid.SHORT);    
            //Nav.back();
        });
       Nav.back();
    });
  },
  bindTarget: function (target) {
    var me = this;
    return function () {
      me.onLogin(target);
    }
  },
  verify:function (argument) {
    OAuthLogin.verify(function (success,data) {
      // console.log(data);
      ToastAndroid.show(data+"", ToastAndroid.SHORT);   
      // body...
    });
  },
  render: function () {
    return (
      <View style={styles.container}>
        <Titlebar showBack={true}/>
        <View style={styles.title}>
              <Text style={styles.titleText}>第三方登录</Text>
        </View>
        <Button text={"微信"} color={"#6EB244"}  icon={"fontawesome|wechat"}   style={styles.loginBtn} onPress={this.bindTarget('weixin') }/>
        <Button text={"QQ"} color={"#5a98de"}  icon={"fontawesome|qq"}  style={styles.loginBtn} onPress={this.bindTarget('qq') }/>

        <Button text={"测试"} color={"#5a98de"}  style={styles.loginBtn} onPress={this.verify}/>
        <Button text={"新浪"} color={"#D25E52"}  icon={"fontawesome|weibo"}  style={styles.loginBtn} onPress={this.bindTarget('sina') }/>
      </View>
    );
  }
});
//<Titlebar showBack={true}/>
// <View style={styles.title}>
//          <Text style={styles.titleText}>第三方登录</Text>
//        </View>
//        <Button text={"微信"} color={"#6EB244"}  icon={"fontawesome|wechat"}   style={styles.loginBtn} onPress={this.bindTarget('weixin') }/>
//        <Button text={"QQ"} color={"#5a98de"}  icon={"fontawesome|qq"}  style={styles.loginBtn} onPress={this.bindTarget('qq') }/>
//
//  <Button text={"测试"} color={"#5a98de"}  style={styles.loginBtn} onPress={this.verify}/>
//        <Button text={"新浪"} color={"#D25E52"}  icon={"fontawesome|weibo"}  style={styles.loginBtn} onPress={this.bindTarget('sina') }/>


var styles = StyleSheet.create({
 	container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  title: {
    alignItems: 'center',
    padding: 15
  },
  titleText: {
    fontSize: 20
  },
  loginBtn: {
    backgroundColor: "#e5e5e5",
    margin: 5,
    borderRadius: 5
  }
});

/*
            <Button text={"登录"} color={"#ffffff"} icon={"fontawesome|qq"} style={styles.loginBtn} onPress={this.onLogin}/>

        <TextInput placeholder={"账号"} onChangeText={(text) => this.setState({username:text})}/>
          <TextInput placeholder={"昵称 默认匿名"} onChangeText={(text) => this.setState({nickname:text})}/>
          <TextInput placeholder={"密码"} secureTextEntry ={true} onChangeText={(text) => this.setState({password:text})}/>

*/
module.exports = Login;