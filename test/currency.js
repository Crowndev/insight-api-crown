'use strict';

var should = require('should');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var CurrencyController = require('../lib/currency');

describe('Currency', function() {

  var crownData = [{
    "id": "crown",
    "name": "Crown",
    "symbol": "CRW",
    "rank": "187",
    "price_usd": "1.45351",
    "price_btc": "0.00013096",
    "24h_volume_usd": "76762.4",
    "market_cap_usd": "23613646.0",
    "available_supply": "16245947.0",
    "total_supply": "16245947.0",
    "max_supply": null,
    "percent_change_1h": "-2.1",
    "percent_change_24h": "11.11",
    "percent_change_7d": "-12.79",
    "last_updated": "1512213259"
  }];

  it.skip('will make live request to coinmarketcap', function(done) {
    var currency = new CurrencyController({});
    var req = {};
    var res = {
      jsonp: function(response) {
        response.status.should.equal(200);
        should.exist(response.data.crw_usd);
        (typeof response.data.crw_usd).should.equal('number');
        done();
      }
    };
    currency.index(req, res);
  });

  it('will retrieve a fresh value', function(done) {
    var TestCurrencyController = proxyquire('../lib/currency', {
      request: sinon.stub().callsArgWith(1, null, {statusCode: 200}, JSON.stringify(crownData))
    });
    var node = {
      log: {
        error: sinon.stub()
      }
    };
    var currency = new TestCurrencyController({node: node});
    currency.exchangeRates = {
      crw_usd: 1.45351,
      btc_usd: 11098.89,
      crw_btc: 0.00013096
    };
    currency.timestamp = Date.now() - 61000 * CurrencyController.DEFAULT_CURRENCY_DELAY;
    var req = {};
    var res = {
      jsonp: function(response) {
        response.status.should.equal(200);
        should.exist(response.data.crw_usd);
        response.data.crw_usd.should.equal(1.45351);
        done();
      }
    };
    currency.index(req, res);
  });

  it('will log an error from request', function(done) {
    var TestCurrencyController = proxyquire('../lib/currency', {
      request: sinon.stub().callsArgWith(1, new Error('test'))
    });
    var node = {
      log: {
        error: sinon.stub()
      }
    };
    var currency = new TestCurrencyController({node: node});
    currency.exchangeRates = {
      crw_usd: 1.45351,
      btc_usd: 11098.89,
      crw_btc: 0.00013096
    };
    currency.timestamp = Date.now() - 65000 * CurrencyController.DEFAULT_CURRENCY_DELAY;
    var req = {};
    var res = {
      jsonp: function(response) {
        response.status.should.equal(200);
        should.exist(response.data.crw_usd);
        response.data.crw_usd.should.equal(1.45351);
        node.log.error.callCount.should.equal(1);
        done();
      }
    };
    currency.index(req, res);
  });

  it('will retrieve a cached value', function(done) {
    var request = sinon.stub();
    var TestCurrencyController = proxyquire('../lib/currency', {
      request: request
    });
    var node = {
      log: {
        error: sinon.stub()
      }
    };
    var currency = new TestCurrencyController({node: node});
    currency.exchangeRates = {
      crw_usd: 1.45351,
      btc_usd: 11098.89,
      crw_btc: 0.00013096
    };
    currency.timestamp = Date.now();
    var req = {};
    var res = {
      jsonp: function(response) {
        response.status.should.equal(200);
        should.exist(response.data.crw_usd);
        response.data.crw_usd.should.equal(1.45351);
        request.callCount.should.equal(0);
        done();
      }
    };
    currency.index(req, res);
  });

});
