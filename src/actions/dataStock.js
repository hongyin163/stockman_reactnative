'use strict';

import React from 'react';
import {
      AsyncStorage
} from 'react-native';

var _ = require('lodash');

var {
      stockLocal,
      objectLocal,
      filterConfig,
      userLocal,
      dataVersionLocal
} = require('./dataLocal');

var util = require('./util');

// { name: 'date', type: 'string' },//0
// { name: 'code', type: 'string' },//0
// { name: 'symbol', type: 'string' },//0
// { name: 'type', type: 'string' },//0
// { name: 'name', type: 'string' },//0
// { name: "price", type: 'float' },//0
// { name: "yestclose", type: 'float' },
// { name: "state", type: 'string' },
// { name: "sort", type: 'int' },
// { name: "inhand", type: 'bool' },
// { name: 'day', type: 'int' },
// { name: 'week', type: 'int' },
// { name: 'last_day', type: 'int' },
// { name: 'month', type: 'int' },
// { name: 'last_week', type: 'int' },
// { name: 'last_month', type: 'int' }
var {
      detail,
      stockInfo,
      // stateInfo,
      // syncStock,
      weekData,
      dayData,
      monthData,
      FindStockRankBy
} = require('./data.js')

var {
	ServerConfig
} = require('../config');
var host = ServerConfig.host;

module.exports = {
      getStockInfo: function (ids, callback) {
            // //body...
            var url = host + 'api/stock/GetStocks/' + ids
            util.get(url, function (stocks) {
                  if (stocks.length > 0)
                        callback && callback(stocks[0]);
                  else
                        callback && callback(null);
            });
            //callback&&callback(detail[0]);
      },
      //获取最近价格
      getPrice: function (ids, callback) {
            var me = this;
            var url = host + 'api/stock/GetPrice/' + ids;
            util.get(url, function (infos) {
                  var state = {};
                  infos.map(function (item, i) {
                        state[item.code] = item;
                  });
                  callback && callback(state);
            });

            //测试
            // var infos=JSON.parse(stockInfo);
            // var state={};
            // infos.map(function (item,i) {
            // 	state[item.code]=item;
            // });					
            // callback&&callback(state);

      },
      getState: function (ids, techCode, callback) {
            var me = this;
            var url = host + 'api/index/FindState';
            util.post(url, { id: ids }, function (stateInfo) {
                  var state = {};
                  stateInfo.map(function (item, i) {
                        state[item.object_code] = item;
                  });
                  callback && callback(state);
            });

            // var state={};
            // stateInfo.map(function (item,i) {
            // 	state[item.object_code]=item;
            // });
            // callback&&callback(state);
      },
      getKData: function (code, cycle, cate, callback) {
            var url = host + 'api/Object/GetKData/' + code + '/' + cycle + '/' + cate;
            util.get(url, function (infos) {
                  callback && callback(infos);
            });
            // var obj={
            // 	'day':dayData,
            // 	'week':weekData,
            // 	'month':monthData
            // }
            // callback&&callback(obj[cycle]);
      },
      getKDataAllCycle: function (code, cate, callback) {
            var url = host + 'api/Object/GetKDataAllCycle/' + code + '/' + cate;
            util.get(url, function (infos) {
                  callback && callback(infos);
            });

            //test
            // var obj={
            // 	'day':dayData,
            // 	'week':weekData,
            // 	'month':monthData
            // }
            // callback&&callback(obj);
      },
      findStockRankBy: function (cate, techIds, callback) {
            var me = this;
            var url = host + 'api/stock/FindStockRankBy';
            var def = {
                  "user_id": "guest",
                  "cate": '0000001,1399001,1399006',
                  // "tech": 'T0001'
            };
            me.getFilterConf(def, function (data) {
                  if (cate && cate.length > 0) {
                        data.cate = cate;
                  }
                  if (techIds && techIds.length > 0) {
                        data.tech = techIds;
                  }
                  util.post(url, data, function (infos) {
                        callback && callback(infos);
                  });

            });

            //callback&&callback(FindStockRankBy);
      },
      getRecoCateCount: function (cates, callback) {
            var me = this;

            var url = host + 'api/stock/GetRecoCateCount';
            var def = {
                  "user_id": "guest",
                  "cate": cates,
                  "tech": "T0001,T0002,T0005,T0006"
            };


            me.getFilterConf(def, function (data) {
                  util.post(url, data, function (infos) {
                        callback && callback(infos);
                  });

            });

            // var d=[{"cate_code":"0000001","count":5},{"cate_code":"0000016","count":3},{"cate_code":"011300","count":5},{"cate_code":"011700","count":5},{"cate_code":"012000","count":5},{"cate_code":"012400","count":5},{"cate_code":"1399001","count":5},{"cate_code":"1399004","count":5},{"cate_code":"1399005","count":5},{"cate_code":"1399006","count":5},{"cate_code":"1399300","count":5}];
            // callback&&callback(d);
      },
      findCrossStock: function (cycle, callback) {

            var me = this;
            var url = host + 'api/stock/FindCrossStock';
            var def = {
                  "cycle": "day",
                  "cate": '0000001,1399001,1399006',
                  "tech": 'T0001'
            };

            me.getFilterConf(def, function (data) {
                  util.post(url, data, function (infos) {
                        callback && callback(infos);
                  });
            });

            // var d=[{"tag":"MACD金叉","cycle":"day","code":"0600057","name":"象屿股份","price":13.85,"yestclose":14.15,"cate":"通信","tech":"T0001","day":1,"week":1,"month":1,"last_day":1,"last_week":1,"last_month":1},{"tag":"KDJ金叉","cycle":"day","code":"0600057","name":"象屿股份","price":13.85,"yestclose":14.15,"cate":"通信","tech":"T0002","day":1,"week":1,"month":1,"last_day":1,"last_week":1,"last_month":1}];
            // callback&&callback(d);
      },
      findStateStock: function (cycle, callback) {
            var me = this;
            var url = host + 'api/stock/FindStateStock';
            var def = {
                  "cycle": "day",
                  "user_id": "guest",
                  "cate": '0000001,1399001,1399006',
                  "tech": "T0001,T0002"
            };

            me.getFilterConf(def, function (data) {
                  util.post(url, data, function (infos) {
                        debugger;
                        callback && callback(infos);
                  });

            });
            // var d=[{"tag":"macd","cycle":"day","code":"0600137","name":"浪莎股份","price":39.43,"yestclose":39.34,"cate":"服装","tech":"T0001","day":1,"week":-1,"month":1,"last_day":-1,"last_week":-1,"last_month":1},{"tag":"kdj","cycle":"day","code":"0600137","name":"浪莎股份","price":39.43,"yestclose":39.34,"cate":"服装","tech":"T0002","day":1,"week":-1,"month":1,"last_day":-1,"last_week":-1,"last_month":-1},{"tag":"kdj","cycle":"day","code":"0600146","name":"商赢环球","price":33.31,"yestclose":33.25,"cate":"服装","tech":"T0002","day":1,"week":1,"month":1,"last_day":-1,"last_week":1,"last_month":1},{"tag":"kdj","cycle":"day","code":"0600400","name":"红豆股份","price":21.63,"yestclose":21.87,"cate":"服装","tech":"T0002","day":1,"week":1,"month":1,"last_day":-1,"last_week":1,"last_month":-1},{"tag":"kdj","cycle":"day","code":"0601566","name":"九牧王","price":21.06,"yestclose":20.72,"cate":"服装","tech":"T0002","day":1,"week":1,"month":1,"last_day":-1,"last_week":1,"last_month":0}];
            // callback&&callback(d);
      },
      getFilterConf: function (option, cb) {
            var def = {
                  "user_id": "guset",
                  "cate": '0000001,1399001,1399006',
                  "tech": 'T0001'
            };
            var data = _.assign(def, option);

            objectLocal.get(function (err, objs) {
                  var cates = [];
                  if (_.isArray(objs)) {
                        objs.forEach((p) => {
                              if (p.type == '2') {
                                    cates.push(p.code);
                              }
                        });
                        if (cates.length > 0) {
                              data.cate = cates.join(',')
                        }

                  }
                  filterConfig.get(function (err, conf) {
                        if (_.isObject(conf)) {
                              data = _.assign(data, conf);
                        }
                        cb && cb(data);
                  });
            });
      },
      downLoad: function (user_id, callback) {
            var me = this;
            //从服务器加载数据到本地
            var url = host + 'api/stock/GetMyStocks/';
            util.get(url, function (syncStock) {

                  var mystock = [];
                  syncStock.stocks.map(function (item, i) {
                        mystock.push({
                              code: item.code,
                              name: item.name,
                              type: item.type,
                              symbol: item.symbol,
                              date: item.date,
                              price: item.price,
                              yestclose: item.yestclose,
                              sort: (item.sort || 0),
                              inhand: item.inhand || false,
                              day: 0,
                              week: 0,
                              month: 0,
                              last_day: 0,
                              last_week: 0,
                              last_month: 0
                        })
                  });
                  var sorts = mystock.sort(function (a, b) {
                        return b.sort - a.sort;
                  });
                  // debugger;
                  dataVersionLocal.save({
                        stock_version: syncStock.version
                  });
                  callback && callback(sorts);

            });
            // var userId = user.get('id')
            // StockMan.Common.get('stock/GetMyStocks/'+, userId, function(success, myStock) {
            //       if (success) {

            //             var list = myStock.stocks;
            //             var store = Ext.getStore('MyStockStore');
            //             store.removeAll();
            //             store.sync();
            //             store.add(list);
            //             store.sync();


            //             //StockMan.Common.updateDataVersoin('my_stock', myStock.version);
            //       }
            //       if (completeCallback)
            //             completeCallback(success, myStock);
            // });
            // .then(function (stocks) {

            // });
      },
      upLoad: function (callback) {
            var me = this;
            //上传本地数据到服务器
            debugger;
            dataVersionLocal.get(function (dataVersion) {
                  var stock_version = 0;
                  if (dataVersion && dataVersion['stock_version']) {
                        stock_version = Number(dataVersion['stock_version']);
                  } else {
                        stock_version = new Date().getTime();
                        dataVersionLocal.save({
                              stock_version: stock_version
                        });
                  }
                  stockLocal.get(function (error, stocks) {
                        if (error) return callback && callback(error);

                        var stockList = stocks.map(function (stock, i) {
                              return {
                                    code: stock.code,
                                    inhand: stock.inhand,
                                    sort: stock.sort
                              };
                        });

                        var url = host + 'api/stock/PostMyStocks';
                        util.post(url, {
                              user_id:"",
                              version: stock_version,
                              stocks: stockList
                        }, function (info) {
                              if (info && info.success) {
                                    callback && callback(null, true);
                              } else {
                                    callback && callback(new Error('upLoad error'));
                              }
                        });
                  });
            })
      },
      search: function (v, callback) {
            if (v == '' || v.length <= 2) {
                  callback && callback([]);
                  return false;
            }
            var me = this;

            function search_callback(list) {
                  stockLocal.get(function (mystocks) {
                        var obj = {};
                        for (var i = 0; i < mystocks.length; i++) {
                              obj[mystocks[i].code] = true;
                        };
                        var stocks = [];
                        for (var i = 0; i < list.length; i++) {
                              var stock = list[i]
                              var code = (stock.type == 'SZ' ? '1' : '0') + stock.symbol;
                              stocks.push({
                                    code: code,
                                    symbol: stock.symbol,
                                    spell: stock.spell,
                                    name: stock.name,
                                    type: stock.type,
                                    price: 0,
                                    yestclose: 0,
                                    sort: i * 10,
                                    exist: !!obj[code]
                              });
                        };
                        callback && callback(stocks);

                  });
            }
            var url = 'http://quotes.money.163.com/stocksearch/json.do?type=HS&count=5&word=' + encodeURI(v) + '&t=' + Math.random() + '&callback=search_callback'
            fetch(url)
                  .then((response) => response.text())
                  .then((responseText) => {
                        debugger;
                        eval(responseText)
                        console.log(responseText);
                  })
                  .catch((error) => {
                        console.warn(error);
                  });
      },
}