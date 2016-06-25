/* @flow */
'use strict';

var React = require('react-native');
var {ColorConfig}=require('../../config');
var {
  PullToRefreshViewAndroid
} = React;

var PullToRefresh = React.createClass({
	setRefreshing:function (isLoading) {
		this._refresh&&this._refresh.getInnerViewNode().setNativeProps({refreshing:isLoading});
	},
	render: function() {
		return (
			<PullToRefreshViewAndroid
				ref={(control)=>this._refresh=control}
				style={this.props.style}
		        colors={[ColorConfig.baseColor]}
        		progressBackgroundColor={'#ffffff'}
		        onRefresh={()=>{this.props.onRefresh&&this.props.onRefresh()}}>
		        {this.props.children}
		    </PullToRefreshViewAndroid>
		);
	}
});

module.exports=PullToRefresh;