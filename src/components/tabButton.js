'use strict';


var React = require('react-native');
var { Icon, } = require('react-native-icons');

var {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} = React;

class button extends React.Component {
  setColor(color){
    this._icon.setNativeProps({color:color});
  }
  render() {
    return (
      <TouchableWithoutFeedback 
        activeOpacity ={0.5}
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
          <View style={[styles.tabButton,this.props.style]}>
              <Icon
                ref={(n)=>this._icon=n}
                name={this.props.icon}
                size={25}
                color={this.props.color}
                style={styles.tabIcon}
              />
              <Text style={styles.tabText}>{this.props.text}</Text>
          </View>
      </TouchableWithoutFeedback >
    );
  }
}
var styles = StyleSheet.create({
  button: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabButton:{   
    alignItems: 'center',
    justifyContent:'center'
  },
  tabText: {
    fontSize: 12
  },
  tabIcon:{
    width:30,
    height:30,
    color:'#d0d0d0'
  }
});
module.exports=button;