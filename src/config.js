var colorConfig = {
	baseColor: '#A50B31',
	avg: {
		5: "#FF0080",
		10: "#E1E100",
		20: "#3D7878",
		60: "#FF8000"
	},
	segmentBtn: {
		focus: '#d40e3f'
	},
	candle: {
		up: '#A50B31',
		down: '#006030'
	}
};

var PlatformConfig = {
	baidu:{
		api_key:'q0UcNM0glvjekMtBQNWzM92y',
		secret_key:'8hRsMQCQGNdwqnyF8GkWBgr6WObZFT5l'
	},
	wx:{
		api_key:'wxb12125f183776372',
		secret_key:'95ee719075fceee12615f4d85d59dfd5'
	},
	qq:{
		api_key:'1103536633',
		secret_key:'oZpzpHzkiFjK8nQ6'
	}
}
var ServerConfig={
	host:'http://www.mandata.cn/webservice/'
}
module.exports = {
	ColorConfig: colorConfig,
	PlatformConfig: PlatformConfig,
	ServerConfig:ServerConfig
}