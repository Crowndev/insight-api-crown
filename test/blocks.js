'use strict';

var should = require('should');
var sinon = require('sinon');
var BlockController = require('../lib/blocks');
var bitcore = require('bitcore-lib-crown');
var _ = require('lodash');

var blocks = require('./data/blocks.json');

var blockIndexes = {
  '9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911': {
    hash: '9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911',
    chainWork: '0000000000000000000000000000000000000000000799bb6460bb078b118e46',
    prevHash: '93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4',
    nextHash: '41fbeae9be3b9ec92cabf9daa4b488f2476defb08cdf76b2fc9fca5c363677c1',
    confirmations: 119,
    height: 1644912
  },
  '93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4': {
    hash: '93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4',
    chainWork: '0000000000000000000000000000000000000000000799b768f2fba39fe525e1',
    prevHash: '956eeaf1ef1890fc0d95026670d58d7ab109e05956f7a6dce5b021b0adb5320e',
    nextHash: '9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911',
    confirmations: 120,
    height: 1644911
  },
  '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7': {
    hash: '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7',
    chainWork: '00000000000000000000000000000000000000000008fb8c9480699c94059901',
    prevHash: '81e87d29f2600494926abf90758fb311ae9ce3acb7c675c560acc57430290153',
    nextHash: '21a080957e376ca82aed06b0037d8df2dcf0a6b050e5c405d5cb21851c3d8728',
    confirmations: 23807,
    height: 1671882
  },
  '0000000000003154731da5db772df12f95b72f03b4fb1d3d73e2f3d0bd706a95': {
    hash: '0000000000003154731da5db772df12f95b72f03b4fb1d3d73e2f3d0bd706a95',
    chainWork: '0000000000000000000000000000000000000000000000003c9a225a225a081a',
    prevHash: '000000000000643f14c17dfd38ff7478c7d3e3034c4b5c52d646f233d15bc909',
    nextHash: '000000000000c9d71a93af73843ee95da1c0cd30d407334072bf48fb3376ddbc',
    confirmations: 1525616,
    height: 170073
  },
  1644912: {
    hash: '9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911',
    chainWork: '0000000000000000000000000000000000000000000799bb6460bb078b118e46',
    prevHash: '93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4',
    nextHash: '41fbeae9be3b9ec92cabf9daa4b488f2476defb08cdf76b2fc9fca5c363677c1',
    confirmations: 119,
    height: 1644912
  },
  1671882: {
    hash: '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7',
    chainWork: '00000000000000000000000000000000000000000008fb8c9480699c94059901',
    prevHash: '81e87d29f2600494926abf90758fb311ae9ce3acb7c675c560acc57430290153',
    nextHash: '21a080957e376ca82aed06b0037d8df2dcf0a6b050e5c405d5cb21851c3d8728',
    confirmations: 23807,
    height: 1671882
  },



  '0000000000000afa0c3c0afd450c793a1e300ec84cbe9555166e06132f19a8f7': {
    hash: '0000000000000afa0c3c0afd450c793a1e300ec84cbe9555166e06132f19a8f7',
    chainWork: '0000000000000000000000000000000000000000000000054626b1839ade284a',
    prevHash: '00000000000001a55f3214e9172eb34b20e0bc5bd6b8007f3f149fca2c8991a4',
    nextHash: '000000000001e866a8057cde0c650796cb8a59e0e6038dc31c69d7ca6649627d',
    confirmations: 119,
    height: 533974
  },
  '000000000008fbb2e358e382a6f6948b2da24563bba183af447e6e2542e8efc7': {
    hash: '000000000008fbb2e358e382a6f6948b2da24563bba183af447e6e2542e8efc7',
    chainWork: '00000000000000000000000000000000000000000000000544ea52e1575ca753',
    prevHash: '00000000000006bd8fe9e53780323c0e85719eca771022e1eb6d10c62195c441',
    confirmations: 119,
    height: 533951
  },
  '00000000000006bd8fe9e53780323c0e85719eca771022e1eb6d10c62195c441': {
    hash: '00000000000006bd8fe9e53780323c0e85719eca771022e1eb6d10c62195c441',
    chainWork: '00000000000000000000000000000000000000000000000544ea52e0575ba752',
    prevHash: '000000000001b9c41e6c4a7b81a068b50cf3f522ee4ac1e942e75ec16e090547',
    height: 533950
  },
  '000000000000000004a118407a4e3556ae2d5e882017e7ce526659d8073f13a4': {
    hash: '000000000000000004a118407a4e3556ae2d5e882017e7ce526659d8073f13a4',
    prevHash: '00000000000000000a9d74a7b527f7b995fc21ceae5aa21087b443469351a362',
    height: 375493
  },
  533974: {
    hash: '0000000000000afa0c3c0afd450c793a1e300ec84cbe9555166e06132f19a8f7',
    chainWork: '0000000000000000000000000000000000000000000000054626b1839ade284a',
    prevHash: '00000000000001a55f3214e9172eb34b20e0bc5bd6b8007f3f149fca2c8991a4',
    height: 533974
  }
};

describe('Blocks', function() {
  describe('/blocks/:blockHash route', function() {
    var insight = {
      'hash': '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7',
      'confirmations': 23807,
      'size': 5734,
      'height': 1671882,
      'version': 1310978,
      'merkleroot': '7ed8a14e5957edaf8f2899ac9aca0990ab7c4896f5c5d22eee44a8309eb15f85',
      'tx': [
        '5055ae0dcfaf70ed203593d895eb30776a6c292b4aa8a0e0335407a74ee706e8',
        'c386c78b987c60189986dd0e359dbfe3d85178fad8cd7576d60cfe2d37358a62',
        '8291e5b0215bead6eb7b03cd7a0e9034c73734f9a3dbde95819bbef937bfdc6b'
      ],
      'time': 1513436443,
      'nonce': 0,
      'bits': '18506d49',
      'difficulty': 13670735997.258162,
      'chainwork': '00000000000000000000000000000000000000000008fb8c9480699c94059901',
      'previousblockhash': '81e87d29f2600494926abf90758fb311ae9ce3acb7c675c560acc57430290153',
      'nextblockhash': '21a080957e376ca82aed06b0037d8df2dcf0a6b050e5c405d5cb21851c3d8728',
      'reward': 9,
      'isMainChain': true,
      'poolInfo': {}
    };

    var bitcoreBlock = bitcore.Block.fromBuffer(new Buffer(blocks['72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7'], 'hex'));

    var node = {
      log: sinon.stub(),
      getBlock: sinon.stub().callsArgWith(1, null, bitcoreBlock),
      services: {
        bitcoind: {
          getBlockHeader: sinon.stub().callsArgWith(1, null, blockIndexes['72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7']),
          isMainChain: sinon.stub().returns(true),
          height: 1645030
        }
      }
    };

    it('block data should be correct', function(done) {
      var controller = new BlockController({node: node});
      var hash = '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7';
      var req = {
        params: {
          blockHash: hash
        }
      };
      var res = {};
      var next = function() {
        should.exist(req.block);
        var block = req.block;
        should(block).eql(insight);
        done();
      };
      controller.block(req, res, next);
    });

    it('block pool info should be correct', function(done) {
      var block = bitcore.Block.fromString(blocks['72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7']);
      var node = {
        log: sinon.stub(),
        getBlock: sinon.stub().callsArgWith(1, null, block),
        services: {
          bitcoind: {
            getBlockHeader: sinon.stub().callsArgWith(1, null, blockIndexes['72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7']),
            isMainChain: sinon.stub().returns(true),
            height: 1645030
          }
        }
      };
      var controller = new BlockController({node: node});
      var req = {
        params: {
          blockHash: hash
        }
      };
      var res = {};
      var next = function() {
        should.exist(req.block);
        var block = req.block;
        req.block.poolInfo.poolName.should.equal('BTC.TOP');
        req.block.poolInfo.url.should.equal('http://btc.top/');
        done();
      };

      var hash = '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7';

      controller.block(req, res, next);
    });

  });

  describe('/blocks route', function() {

    var insight = {
      'blocks': [
        {
          'height': 1644912,
          'size': 1048,
          'hash': '9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911',
          'time': 1511740764,
          'txlength': 1,
          'poolInfo': {
            'poolName': 'BTC.TOP',
            'url': 'http://btc.top/'
          }
        },
        {
          'height': 1644911,
          'size': 1048,
          'hash': '93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4',
          'time': 1511740698,
          'txlength': 1,
          'poolInfo': {
            'poolName': 'BTC.TOP',
            'url': 'http://btc.top/'
          }
        }
      ],
      'length': 2,
      'pagination': {
        'current': '2017-11-26',
        'currentTs': 1511740799,
        'isToday': false,
        'more': false,
        'next': '2017-11-27',
        'prev': '2017-11-25'
      }
    };

    var stub = sinon.stub();
    stub.onFirstCall().callsArgWith(1, null, new Buffer(blocks['9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911'], 'hex'));
    stub.onSecondCall().callsArgWith(1, null, new Buffer(blocks['93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4'], 'hex'));

    var hashes = [
      '93bda3677c80a6a2e57e8358e3ed99a566cd38a7dd3dc16bcada2714a4b67ba4',
      '9985318b821f41d9dc3825ff0b3d1505b37dc446742d57cebdb2c26ba6d82911'
    ];
    var node = {
      log: sinon.stub(),
      services: {
        bitcoind: {
          getRawBlock: stub,
          getBlockHeader: function(hash, callback) {
            callback(null, blockIndexes[hash]);
          },
          getBlockHashesByTimestamp: sinon.stub().callsArgWith(2, null, hashes)
        }
      }
    };

    it('should have correct data', function(done) {
      var blocks = new BlockController({node: node});

      var req = {
        query: {
          limit: 2,
          blockDate: '2017-11-26'
        }
      };

      var res = {
        jsonp: function(data) {
          should(data).eql(insight);
          done();
        }
      };

      blocks.list(req, res);
    });
  });

  describe('/block-index/:height route', function() {
    var node = {
      log: sinon.stub(),
      services: {
        bitcoind: {
          getBlockHeader: function(height, callback) {
            callback(null, blockIndexes[height]);
          }
        }
      }
    };

    it('should have correct data', function(done) {
      var blocks = new BlockController({node: node});

      var insight = {
        'blockHash': '72a79139b132951724255181232988eeabc19e9b855a87727a3d8d59b369e2f7'
      };

      var height = 1671882;

      var req = {
        params: {
          height: height
        }
      };
      var res = {
        jsonp: function(data) {
          should(data).eql(insight);
          done();
        }
      };

      blocks.blockIndex(req, res);
    });
  });

  describe('#getBlockReward', function() {
    var node = {
      log: sinon.stub()
    };
    var blocks = new BlockController({node: node});

    it('should give a correct reward for block 1000000', function() {
      blocks.getBlockReward(1000000).should.equal(10 * 1e8);
    });

    it('should give a correct reward for block 2000000', function() {
      blocks.getBlockReward(2000000).should.equal(9 * 1e8);
    });

    it('should give a correct reward for block 3730110', function() {
      blocks.getBlockReward(3730110).should.equal(4.5 * 1e8);
    });

    it('should give a correct reward for block 5000000', function() {
      blocks.getBlockReward(5000000).should.equal(2.25 * 1e8);
    });
  });
});
