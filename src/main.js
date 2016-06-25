
var React = require('react-native');
var SideMenu = require('./libs/react-native-side-menu');
var Menu=require('./components/menu');
var TextButton=require('./components/control/button');
var TabPanel=require('./components/tabPanel');
//var Setting=require('./components/setting');
var Subscribable = require('Subscribable');
var StockDetail=require('./components/stock/stockDetail');



const {
  StyleSheet,
  Text,
  View,
  Navigator,
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Animated,
  BackAndroid,
  Component
} = React;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  button2: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

class Button extends Component {
  handlePress(e) {
    this.context.menuActions.toggle();
    if (this.props.onPress) {
      this.props.onPress(e);
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.handlePress.bind(this)}
        style={this.props.style}>
        <Text>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

Button.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

class Basic extends Component {
  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      touchToClose: false,
    };
  }

  handleOpenWithTouchToClose() {
    this.setState({
      touchToClose: true,
    });
  }

  handleChange(isOpen) {
    if (!isOpen) {
      this.setState({
        touchToClose: false,
      });
    }
  }
  componentWillMount() {
    var me=this;
    NativeAppEventEmitter.addListener('openMenu', this.onOpenMenu.bind(this));
    NativeAppEventEmitter.addListener('stockDetail', this.onOpenStockDetail.bind(this));
    NativeAppEventEmitter.addListener('back', this.onBack.bind(this));
    BackAndroid.addEventListener('hardwareBackPress', function() {
        NativeAppEventEmitter.emit('back');
    });
  }
  onBack() {
    this.refs.navigator.pop();
  }
  onOpenMenu(a){ 
    this.refs.drawerMenu.toggleMenu();
  }
  onOpenStockDetail(data){
    this.refs.navigator.push({name:data.name,component:(<StockDetail key={'main_stockdetail'} name={data.name}/>)});
  }
  render() {
    return (
      <SideMenu
        ref="drawerMenu"
        menu={<Menu />}
        touchToClose={this.state.touchToClose}
        onChange={this.handleChange.bind(this)}>
           <Navigator
            ref='navigator'
            debugOverlay={false}
            style={styles.appContainer}
            configureScene={(route) =>Navigator.SceneConfigs.FloatFromRight}
            initialRoute={{name:'main',component:(<TabPanel/>)}}
            renderScene={(route, navigator) => {          
                return (route.component);
            }}
          />
      </SideMenu>
    );
  }
}

module.exports = Basic;