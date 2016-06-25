'use strict';


var React = require('react-native');
var { Icon, } = require('react-native-icons');

var {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} = React;

class button extends React.Component {
  onPress(){
    this.props.onPress&&this.props.onPress();
  }
  render() {
    var subitem=[];
    if(this.props.icon){
      subitem.push(<Icon key={"1"} name={this.props.icon} size={25} color={this.props.color} style={styles.buttonIcon} />);
    }
    if(this.props.text){
      subitem.push(<Text key={"2"} style={[styles.buttonText,{color:this.props.color}]}>{this.props.text}</Text>);
    }
    return (
      <TouchableOpacity 
        activeOpacity ={0.5}       
        underlayColor="#B5B5B5"
        onPress={this.onPress.bind(this)}>
        <View  style={[styles.button,this.props.style]}>
          {subitem}
        </View>       
      </TouchableOpacity >
    );
  }
}
var styles = StyleSheet.create({
  button: {
    flexDirection:'row',
    padding: 5,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'transparent'
  },
  buttonText: {
    fontSize: 17,
    //fontWeight: '500',
    marginLeft:5,
    marginRight:5
  },
  buttonIcon:{
    width:30,
    height:30,
    marginLeft:5,
    marginRight:5
  }
});
module.exports=button;