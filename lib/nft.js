'use strict';

var Common = require('./common');

function NftController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

NftController.prototype.totalSupply = function(req, res) {
  var self = this;

  this.node.nftTotalSupply(req.params.protocolId, function(err, totalSupply) {
    if(err) {
      return self.common.handleErrors(err, res);
    }

    res.jsonp(totalSupply);
  });
};

module.exports = NftController;
