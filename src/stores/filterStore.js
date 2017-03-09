var alt = require('../actions/alt');
var actions = require('../actions/filterAction');
var {
	filterConfig
} = require('../actions/dataLocal');

var options = {
	price: {
		title: '股价(元)',
		name: 'price',
		options: [
			['-1', '不限'],
			['0-20', '0-20'],
			['20-59', '20-59'],
			['50-9999', '50以上']
		]
	},
	mv: {
		title: '市值(亿)',
		name: 'mv',
		options: [
			['-1', '不限'],
			['0-100', '0-100'],
			['100-500', '100-500'],
			['500-9999', '500以上']
		]
	},
	pe: {
		title: '市盈率',
		name: 'pe',
		options: [
			['-1', '不限'],
			['1-20', '1-20'],
			['20-50', '20-50'],
			['50-9999', '50以上']
		]
	},
	pb: {
		title: '市净率',
		name: 'pb',
		options: [
			['-1', '不限'],
			['0-2', '0-2'],
			['2-5', '2-5'],
			['5-9999', '5以上']
		]
	},
	tech: {
		title: '技术指标',
		name: 'tech',
		multiselect: true,
		options: [
			['T0001', 'macd'],
			['T0002', 'kdj'],
			['T0003', 'rsi'],
			['T0004', 'trix'],
			['T0005', 'dma'],
			['T0006', 'ma']
		]
	}
}

class FilterStore {
	constructor() {
		var me = this;

		me.data = options;

		me.getValues = function() {
			var values = {};
			for (var pro in me.data) {
				var ms = me.data[pro].multiselect ? true : false;
				me.data[pro].options.forEach((p, j) => {
					if (p.selected == true) {
						if (ms) {
							if (values[pro] == undefined) {
								values[pro] = p[0];
							}
							else {
								values[pro] += ',' + p[0];
							}
						} else {
							values[pro] = p[0];
						}

						// return ms;
					}
				})
			}
			return values;
		}
		me.bindListeners({
			handleSelect: actions.SELECT,
			handleLoad: actions.LOAD,
		});
	}
	handleSelect(data) {
		var name = data.name;
		var index = data.index;
		var multiselect = data.multiselect;
		if (!multiselect) {
			this.data[name].options.forEach((d) => {
				d['selected'] = false;
			})
		}
		this.data[name].options[index]['selected'] = !this.data[name].options[index]['selected'];
	}
	handleLoad(data) {
		debugger;
		var me = this;
		if(Object.keys(data).length==0){
			return;
		}
		
		for (var pro in me.data) {
			me.data[pro].options.forEach((p) => {
				if (data[pro].indexOf(p[0])>=0) {
					p['selected'] = true;
				} else {
					p['selected'] = false;
				}
			})
		}
	}
}
module.exports = alt.createStore(FilterStore, 'FilterStore');