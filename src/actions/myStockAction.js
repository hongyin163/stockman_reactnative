var alt = require('./alt');
//import {createActions} from 'alt/utils/decorators';
var dataStock = require('./dataStock');
var {
  stockLocal,
  userLocal
} = require('./dataLocal');
//@createActions(flux)
//var mystock={"user_id":"18669040658","version":0.00,"stocks":[{"id":null,"date":null,"code":"1300142","symbol":"","type":null,"name":"沃森生物","price":null,"yestclose":null,"state":null,"inhand":false,"sort":20,"volume":null,"turnover":null,"open":null,"high":null,"updown":null,"low":null,"turnoverrate":null,"pe":null,"pb":null,"fv":null,"mv":null,"percent":null}]};
var util = require('./util');

class MyStockActions {
  loadMyStock(callback) {
    var me = this;
    return (dispatch) => {
      debugger;
      //action.setLoading(true);
      stockLocal.get((error, stocks) => {
        //action.setLoading(false);
        if (!error) {
          dispatch(stocks);
          //callback&&callback(stocks);
        } else {
          me.loadFailed(error);
          //callback&&callback(stocks);
        }
      });
    }
  }
  loadPriceData(code, cycle) {
    var me = this;
    return (dispatch) => {
      var data = {};
      dataStock.getKData(code, cycle, "1", function (data) {
        var current = data.current;
        if (data.current != undefined && data.current != '') {
          data.history.push([current.date, current.open, current.price, current.high,
          current.low, current.volume, current.updown, current.percent, current.yestclose
          ])
        }
        var kdata = [];
        var c1 = 5,
          c2 = 10,
          c3 = 20,
          c4 = 60;

        data.history.forEach(function (e, i) {
          kdata.push([
            e[0],
            e[1], //开盘 
            e[2], //收盘
            e[3], //最高
            e[4], //最低   
            e[5], //成交量
            (e[6] || 0), //涨跌额
            (e[7] || 0), //涨跌幅
            util.getAvg(c1, data.history, i), //移动平均线1
            util.getAvg(c2, data.history, i), //移动平均线2
            util.getAvg(c3, data.history, i), //移动平均线3
            util.getAvg(c4, data.history, i) //移动平均线4
          ]);
        });
        dispatch({
          cycle: cycle,
          price: kdata
        });
      });
    }
  }
  loadStockInfo(code) {
    var me = this;
    return (dispatch) => {
      dataStock.getStockInfo(code, function (stock) {
        if (stock) {
          dispatch(stock);
        }
      });
    }
  }
  loadKDataAllCycle(code, cate, callback) {
    var me = this;
    dataStock.getKDataAllCycle(code, cate, function (price) {
      var cycles = ['day', 'week', 'month'];
      var result = {};
      cycles.forEach(function (cycle, i) {
        var data = price[cycle]
        if (data.current != undefined && data.current != '') {
          var current = data.current;
          data.history.push([current.date, current.open, current.price, current.high,
          current.low, current.volume, current.updown, current.percent, current.yestclose
          ])
        }
        result[cycle] = data.history;
      });
      callback && callback(result);
      // if(result)
      //   me.dispatch(result);
    });
  }
  loadRecommendStock(cate) {
    var me = this;
    return (dispatch) => {
      dataStock.findStockRankBy(cate, '', function (items) {
        dispatch(items);
      });
    }
  }
  loadRecoRankStock() {
    var me = this;
    return (dispatch) => {
      dataStock.findStockRankBy('', '', function (items) {
        dispatch(items);
      });
    }
  }
  loadRecoCrossStock() {
    var me = this;
    return (dispatch) => {
      dataStock.findCrossStock('', '', function (items) {
        me.dispatch(items);
      });
    }
  }
  loadRecoStateStock() {
    var me = this;
    return (dispatch) => {
      dataStock.findStateStock('', '', function (items) {
        dispatch(items);
      });
    }
  }
  add(item) {
    var obj = {
      code: item.code,
      name: item.name,
      type: item.type,
      symbol: item.symbol,
      date: '',
      price: item.price,
      yestclose: item.yestclose,
      sort: 0,
      inhand: false,
      day: 0,
      week: 0,
      month: 0,
      last_day: 0,
      last_week: 0,
      last_month: 0
    };
    this.dispatch(obj);
  }
  remove(code) {
    return (dispatch) => dispatch(code);
  }
  setInHand(code, inhand) {
    return (dispatch) => {
      dispatch({
        code: code,
        inhand: inhand
      });
    }
  }
  search(v) {
    if (v == '' || v.length <= 2)
      return false;
    var me = this;
    return (dispatch) => {
      dataStock.search(v, function (results) {
        dispatch({
          input: v,
          list: results
        });
      });
    }
  }
  setTop(code) {
    return (dispatch) => {
      dispatch(code);
    }
  }
  sort(direction) {
    return (dispatch) => {
      dispatch(direction);
    }
  }
  setTech(code, name) {
    return (dispatch) => {
      dispatch({
        code: code,
        name: name
      });
    }
  }
  updatePrice(state, callback) {
    var me = this;

    if (state == undefined || state.stockList == undefined || state.stockList.length == 0)
      return;

    if (!state.stockList.map)
      return;

    //me.actions.setLoading(true);
    return function (dispatch) {

      var idArray = state.stockList.map((item) => item.code);
      var ids = idArray.join(',');

      dataStock.getPrice(ids, function (result) {
        var items = state.stockList;
        for (var i = 0; i < items.length; i++) {
          if (!result[items[i].code])
            continue;
          var item = items[i];
          item.date = result[item.code].date;
          item.price = result[item.code].price;
          item.yestclose = result[item.code].yestclose;
          if (item.price > 0 && item.yestclose > 0)
            item.percent = Number(item.price - item.yestclose) / item.price;
          else
            item.percent = 0;
        };
        dispatch(items);
        callback && callback();
      });
    }
  }
  updateState(state, techCode, callback) {
    var me = this;
    if (state.stockList == undefined || state.stockList.length == 0)
      return;
    if (!state.stockList.map)
      return;
    //me.actions.setLoading(true);
    return function (dispatch) {
      var idArray = state.stockList.map((item) => '1_' + item.code + '_' + techCode);
      var ids = idArray.join(',');
      dataStock.getState(ids, techCode, function (result) {

        var items = state.stockList;
        for (var i = 0; i < items.length; i++) {
          if (!result[items[i].code])
            continue;
          items[i].day = result[items[i].code].day;
          items[i].week = result[items[i].code].week;
          items[i].month = result[items[i].code].month;
          items[i].last_day = result[items[i].code].last_day;
          items[i].last_week = result[items[i].code].last_week;
          items[i].last_month = result[items[i].code].last_month;
        };
        dispatch(items);
        callback && callback();
      });
    }
  }
  downLoad(cb) {
    var me = this;
    return (dispatch) => {
      debugger;
      userLocal.get(function (err, user) {
        if (err) {
          cb && cb(err);
          return;
        }
        dataStock.downLoad(user.id, function (result) {
          debugger;
          dispatch(result);
          cb && cb(null, result);
        });
      });
    }
  }
  upLoad(cb) {
    dataStock.upLoad(cb);
  }
  removeAll() {
    var me = this;
    return (dispatch) => {
      stockLocal.removeAll(() => {
        dispatch([]);
      });
    }
  }
  loadFailed(errorMessage) {
    return (dispatch) => {
      dispatch(errorMessage);
    }
  }
  setLoading(isLoading) {
    return (dispatch) => {
      dispatch(isLoading);
    }
  }
  isMyStock(code, callback) {
    stockLocal.get(function (error, stocks) {

      if (error != null || !stocks || stocks.length == 0)
        callback && callback(false);
      var count = 0;
      stocks.forEach((stock) => {
        if (stock.code == code) {
          count++;
        }
      });
      callback && callback(count > 0);
    });
  }
}
module.exports = alt.createActions(MyStockActions);;