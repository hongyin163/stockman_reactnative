import React from 'react-native';
var IconButton=require('./button');
var Nav=require('../nav');
var {ColorConfig}=require('../../config');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  PropTypes,
  NativeAppEventEmitter
} = React;

var Titlebar=React.createClass({
  propTypes:{
    showBack:PropTypes.bool
  },
  back:function (argument) {
    //NativeAppEventEmitter.emit('nav',{name:'back'});
    Nav.back();
    this.props.onBack&&this.props.onBack();
  },
	render: function() {
    var childs=[];
    if(this.props.showBack==true){
      childs.push(<IconButton key={'back'} icon="fontawesome|chevron-left" color="#fff" onPress={this.back}/>);
    }
    if(this.props.title){
      childs.push(<View  style={{flexDirection:'row',justifyContent:'flex-start', flex:1,alignItems: 'center'}} key={'title'}><Text style={{color:'#fff',fontSize: 17}}>{this.props.title}</Text></View>);
    }
		return (
			<View style={[styles.container,this.props.style]}>
        {childs}
				{this.props.children}
			</View>		
		);
	}
});

var styles = StyleSheet.create({
  container: {
    height:50,
  	flexDirection:'row',
  	justifyContent:'flex-start',
    padding:5,
  	alignItems:'center',
  	backgroundColor:ColorConfig.baseColor
  }
});
module.exports=Titlebar;