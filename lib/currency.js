'use strict';

var request = require('request');

function CurrencyController(options) {
  this.node = options.node;
  var refresh = options.currencyRefresh || CurrencyController.DEFAULT_CURRENCY_DELAY;
  this.currencyDelay = refresh * 60000;
  this.exchangeRates = {
    crw_usd: 0,
    btc_usd: 0,
    crw_btc: 0
  };
  this.timestamp = Date.now();
}

CurrencyController.DEFAULT_CURRENCY_DELAY = 10;

CurrencyController.prototype.index = function(req, res) {
  var self = this;
  var currentTime = Date.now();
  if (self.exchangeRates.crw_usd === 0 || currentTime >= (self.timestamp + self.currencyDelay)) {
    self.timestamp = currentTime;
    request('https://api.coinmarketcap.com/v1/ticker/crown/', function(err, response, body) {
      if (err) {
        self.node.log.error(err);
      }
      if (!err && response.statusCode === 200) {
        var response = JSON.parse(body);
        self.exchangeRates = {
          crw_usd: response[0].price_usd,
          btc_usd: response[0].price_usd / response[0].price_btc,
          crw_btc: response[0].price_btc
        };
      }
      res.jsonp({
        status: 200,
        data: self.exchangeRates
      });
    });
  } else {
    res.jsonp({
      status: 200,
      data: self.exchangeRates
    });
  }

};

module.exports = CurrencyController;
