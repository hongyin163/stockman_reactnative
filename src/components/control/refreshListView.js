/* @flow */
'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var PullToRefreshView=require('./pullToRefresh');
var {
  ScrollView,
  StyleSheet,
  View,
  ListView,
  PullToRefreshViewAndroid
} = React;
//<ObjectList data={} category={}/>
var ObjectList = React.createClass({
	onRefresh:function (argument) {
		this.props.onRefresh&&this.props.onRefresh();
	},
	setRefreshing:function (isLoading) {
		this._refresh&&this._refresh.setRefreshing(isLoading);
	},
	renderSectionHeader:function(sectionData: string, sectionID: string) {
		if(this.props.renderSectionHeader)
			return this.props.renderSectionHeader(sectionData, sectionID);
		return [];
	},
	renderRow:function (obj) {
		if(this.props.renderRow)
			return this.props.renderRow(obj);
		return [];
	},
	render: function() {
		return (
			<PullToRefreshView 
		        style={styles.container}
		        ref={(control)=>this._refresh=control}
		        onRefresh={this.onRefresh}>     
	             <ListView
	              pageSize={this.props.pageSize||10}
		          dataSource={this.props.dataSource}		     
              	  renderSectionHeader={this.renderSectionHeader}
		          renderRow={this.renderRow}/>  
	        </PullToRefreshView>  
		);
	}
});

var styles = StyleSheet.create({
	container:{
		flex:1
	}
});


module.exports = ObjectList;
