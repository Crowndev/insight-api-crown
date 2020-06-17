'use strict';

var Common = require('./common');

function NftController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

NftController.prototype.totalSupply = function(req, res) {
  var self = this;

  this.node.nftTotalSupply(req.query.protocolId, function(err, totalSupply) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(totalSupply);
  });
};

NftController.prototype.balanceOf = function(req, res) {
  var self = this;

  this.node.nftBalanceOf(req.params.ownerAddress, req.query.protocolId, function(err, balance) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(balance);
  });
};

NftController.prototype.ownerOf = function(req, res) {
  var self = this;

  this.node.nftOwnerOf(req.params.protocolId, req.params.tokenId, function(err, address) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(address);
  });
};

NftController.prototype.getByTxid = function(req, res) {
  var self = this;

  this.node.nftGetByTxid(req.params.txid, function(err, record) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(record);
  });
};

NftController.prototype.get = function(req, res) {
  var self = this;

  this.node.nftGet(req.params.protocolId, req.params.tokenId, function(err, record) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(record);
  });
};

module.exports = NftController;
