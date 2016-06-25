/* @flow */
'use strict';

var React = require('react-native');
var Easing = require('Easing');
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
var Component = React.createClass({
	getInitialState: function() {
		return {
			first:new Animated.Value(0),
			second:new Animated.Value(0),
			three:new Animated.Value(0)
		};
	},
	reset:function (argument) {
		this.state.first.setValue(0);
		this.state.second.setValue(0);
		this.state.three.setValue(0);
	},
	getAnimations:function (argument) {
		return[
			Animated.spring(                          // Base: spring, decay, timing
		      this.state.first,                 // Animate `bounceValue`
		      {
		        toValue: SCREEN_WIDTH-50,                         // Animate to smaller size
		        friction: 7,    
		        tension:40                      // Bouncier spring
		      }
		    ),
		   Animated.decay(                          // Base: spring, decay, timing
		      this.state.second,                 // Animate `bounceValue`
		      {
		        //toValue: SCREEN_WIDTH-50,                         // Animate to smaller size
		        velocity: 1,    
		        deceleration:0.997               // Bouncier spring
		      }
		    ),
		    Animated.timing(                          // Base: spring, decay, timing
		      this.state.three,                 // Animate `bounceValue`
		      {
		        toValue: SCREEN_WIDTH-50,                         // Animate to smaller size
		        easing: Easing.inOut(Easing.ease),
		        delay:0                  // Bouncier spring
		      }
		    )
		];
	},
	onStagger:function (argument) {
		this.reset();
		Animated.stagger(150,this.getAnimations()).start();
	},
	onParallel:function (argument) {
		this.reset();
		Animated.parallel(this.getAnimations()).start();
	},
	onSequence:function (argument) {
		this.reset();
		Animated.sequence(this.getAnimations()).start();
	},
	onAll:function (argument) {
		var me=this;
		this.reset();
		Animated.sequence([
			Animated.stagger(50,me.getAnimations()),
			Animated.sequence([
			    Animated.spring(                          // Base: spring, decay, timing
			      this.state.first,                 // Animate `bounceValue`
			      {
			        toValue: 0,                         // Animate to smaller size
			        friction: 7,    
			        tension:40                      // Bouncier spring
			      }
			    ),
			   	Animated.decay(                          // Base: spring, decay, timing
			      this.state.second,                 // Animate `bounceValue`
			      {
			        //toValue: SCREEN_WIDTH-50,                         // Animate to smaller size
			        velocity: -1,    
			        deceleration:0.997               // Bouncier spring
			      }
			    ),
			    Animated.timing(                          // Base: spring, decay, timing
			      this.state.three,                 // Animate `bounceValue`
			      {
			        toValue: 0,                         // Animate to smaller size
			        easing: Easing.bezier(.13,.93,.79,.07),
			        delay:0                  // Bouncier spring
			      }
			    )
		]),
		Animated.parallel(me.getAnimations())
		]).start();
	},
	render: function() {
		return (
		  <View style={styles.container}>
		  	<View style={{flex:1}}>
			  	<Animated.View style={[styles.view,{top:50,left:this.state.first}]}><Text>spring</Text></Animated.View>
			  	<Animated.View style={[styles.view,{top:150,left:this.state.second}]}><Text>decay</Text></Animated.View>
			  	<Animated.View style={[styles.view,{top:250,left:this.state.three}]}><Text>timing</Text></Animated.View>
		  	</View>
		  	<View style={{flexDirection:'row',height:80,justifyContent :'center',alignItems: 'center'}}>
		  		<TouchableWithoutFeedback onPress={this.onStagger}>
		  			<View style={styles.btn}><Text>stagger</Text></View>
		  		</TouchableWithoutFeedback>
		  		<TouchableWithoutFeedback onPress={this.onParallel}>
		  			<View style={styles.btn}><Text>parallel</Text></View>
		  		</TouchableWithoutFeedback>
		  		<TouchableWithoutFeedback onPress={this.onSequence}>
		  			<View style={styles.btn}><Text>sequence</Text></View>
		  		</TouchableWithoutFeedback>
		  		<TouchableWithoutFeedback onPress={this.onAll}>
		  			<View style={styles.btn}><Text>组合</Text></View>
		  		</TouchableWithoutFeedback>
		  	</View>
		  </View>
		);
	} 
});
 
var styles = StyleSheet.create({
	container:{
		flex:1
	},
	view:{
		position:'absolute',		
		backgroundColor:'red',
		width:50,
		height:50,
		justifyContent :'center',
        alignItems: 'center',
	},
	btn:{
		width:100,
		height:50,
		backgroundColor:'red',
		justifyContent :'center',
        alignItems: 'center',
        margin:5
	}
});


module.exports = Component;
