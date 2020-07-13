'use strict';

var Common = require('./common');

function NftProtocolController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

NftProtocolController.prototype.ownerOf = function(req, res) {
  var self = this;

  this.node.nftProtocolOwnerOf(req.params.protocolId, function(err, address) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(address);
  });
};

NftProtocolController.prototype.getByTxid = function(req, res) {
  var self = this;

  this.node.nftProtocolGetByTxid(req.params.txid, function(err, record) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(record);
  });
};

NftProtocolController.prototype.get = function(req, res) {
  var self = this;

  this.node.nftProtocolGet(req.params.protocolId, function(err, record) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(record);
  });
};

NftProtocolController.prototype.list = function(req, res) {
  var self = this;

  this.node.nftProtocolList(req.query.count, req.query.skipFromTip, req.query.height, req.query.regTxOnly, function(err, records) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(records);
  });
};

NftProtocolController.prototype.register = function(req, res) {
  var self = this;

  this.node.nftProtocolRegister(req.params.protocolId, req.query.protocolName, req.query.ownerAddress, req.query.regSign, req.query.metadataMimeType, req.query.metadataSchemaUri, req.query.isTransferable, req.query.isMetadataEmbedded, req.query.maxMetadataSize, function(err, records) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(records);
  });
};

module.exports = NftProtocolController;
