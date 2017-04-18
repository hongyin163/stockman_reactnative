var alt = require('../actions/alt');
var actions = require('../actions/cloudAction');

import { Map, List } from 'immutable';

class AmountStore {
    constructor() {
        //金额
        this.data = Map({
            total: 0,
            amount: 0,
            mv: 0,
            percent: 0
        });

        this.bindListeners({
            handleLoadMyAmount: actions.LOAD_MY_AMOUNT
        });
    }
    handleLoadMyAmount(data) {
        me.data = me.data.merge(data);
    }
}
module.exports = alt.createStore(AmountStore, 'AmountStore');