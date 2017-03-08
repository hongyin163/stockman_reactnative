'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
} from 'react-native';

var Titlebar = require('../control/titlebar');
var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
var Disclaimer = React.createClass({
	render: function () {
		var text = '我们努力为用户提供免费又好的服务，目前正处在成长阶段，尚存在不成熟的地方，因为本软件导致投资亏损，本软件无法担责，请谅解！\r\n\r\n同时非常希望您提出宝贵的建议和意见，我们不断完善，感谢您关注慢牛，祝您投资成功！'
		return (
			<View style={styles.container}>
				<Titlebar showBack={true} title={"免责声明"} />
				<View style={{ flex: 1, padding: 15 }}>
					<Text>{text}</Text>
				</View>
			</View>
		);
	}
});

module.exports = Disclaimer;