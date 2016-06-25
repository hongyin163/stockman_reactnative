'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} = React;

var height=50;

var styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  tabs: {
    flex:1,
    height: height,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#ccc'
  },
  container:{
    height:height,
    flexDirection: 'row'
  },
  toolbarLeft:{
    height:height,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:5,
  },
  toolbarRight:{
    height:height,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding:5,
  }
});

var DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor : React.PropTypes.string,
    backgroundColor : React.PropTypes.string,
    activeTextColor : React.PropTypes.string,
    inactiveTextColor : React.PropTypes.string,
    renderRightTool: React.PropTypes.func,
    renderLeftTool: React.PropTypes.func,
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    var activeTextColor = this.props.activeTextColor || "navy";
    var inactiveTextColor = this.props.inactiveTextColor || "black";
    return (
      <TouchableOpacity style={[styles.tab]} key={name} onPress={() => this.props.goToPage(page)}>
        <View>
          <Text style={{color: isTabActive ? activeTextColor : inactiveTextColor,
            fontWeight: isTabActive ? 'bold' : 'normal'}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  renderRightTool(){
    if(this.props.renderRightTool)
      return this.props.renderRightTool();
    return [];
  },
  renderLeftTool(){
    if(this.props.renderLeftTool)
      return this.props.renderLeftTool();
    return [];
  },
  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / (numberOfTabs*3),
      height: 2,
      backgroundColor: this.props.underlineColor || "navy",
      bottom: 5,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0,  containerWidth / (numberOfTabs*3),]
    });

    return (
      <View style={[styles.container, {backgroundColor : this.props.backgroundColor || null},this.props.style]}>
        <View style={styles.toolbarLeft}>
          {this.renderLeftTool()}
        </View>
        <View style={[styles.tabs]}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
          <Animated.View style={[tabUnderlineStyle, {left}]} />
        </View>
        <View style={styles.toolbarRight}>
          {this.renderRightTool()}
        </View>
      </View>
    );
  },
});

module.exports = DefaultTabBar;
