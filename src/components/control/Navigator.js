/* @flow */
'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Animated,
  Dimensions
} = React;
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var SCENE_DISABLED_NATIVE_PROPS = {
  pointerEvents: 'none',
  style: {
    top: SCREEN_HEIGHT,
    bottom: -SCREEN_HEIGHT,
    opacity: 0,
  },
};
var SCENE_ENABLED_NATIVE_PROPS = {
      pointerEvents: 'auto',
      style: {
        top:0,
        bottom:0,
        opacity: 1
      },
};


var Navigator = React.createClass({
	getInitialState: function() {
	  return {
	    currentIndex:0,
	    fromIndex:0,
	    toIndex:0,
	    stack:[],
	  };
	},	
	componentDidMount: function() {
		var me=this;
		if(me._animatedViews.length==1){
			me._animatedViews[0].setNativeProps(SCENE_ENABLED_NATIVE_PROPS);
			return;
		}
		//新UI滑入
		if(this.state.stack.length==0)
			return;
		if(this.state.fromIndex<this.state.toIndex){
			Animated.spring(
		      this.state.stack[this.state.toIndex].left,
		      {
		        toValue: {x:0,y:0},
		        friction: 8,
		      }
		    ).start();
		}else{
			Animated.spring(
		      this.state.stack[this.state.fromIndex].left,
		      {
		        toValue: {x:255,y:255},
		        friction: 8,
		      }
		    ).start();
		}
	},
	push:function (arg) {
		var state=this.state;
		arg['left']=new Animated.Value(255);
		state.stack.push(arg);
		state.fromIndex=state.stack.length-2;
		state.toIndex=state.stack.length-1;
		state.currentIndex=state.stack.length-1;
		this.setState(state);
	},
	pop:function(){
		var state=this.state;
		//state.stack.pop();
		

		state.fromIndex=state.currentIndex
		state.toIndex=state.currentIndex-1
		state.currentIndex--;

		if(state.stack.length-1>state.currentIndex){
			state.stack.pop();
		}
		//执行动画后
		this.setState(state);
	},
	_animatedViews:[],
	_animatedKeys:{},
	renderScene:function(args){
		return this.props.renderScene(args);
	},
	render: function() {
		var me=this;
		var stack=this.state.stack;
		var animateScenes=[];
		stack.map(function (item) {
			if(!me._animatedKeys[item.key]){
				if(me.renderScene){
					var FameView=Animated.createAnimatedComponent(me.renderScene(item));			
					me._animatedViews.push(<FameView 
						key={item.key} 
						style={[styles.hide,{
							   transform: [{
							     translateX:item.left ,
							   }]
						}]}/>);
					me._animatedKeys[item.key]=FameView;
				}
			}
		});

		return (
		  <View style={styles.container}>
		  	{me._animatedViews}
		  </View>
		);
	}
});


var styles = StyleSheet.create({
	container:{
		flex:1
	},
	hide:{
		position: 'absolute',	
		top:100,
		left:0,
		right:0,
		height:100,
		opacity:0.5,
		backgroundColor:'red'
	}
});


module.exports = Navigator;
