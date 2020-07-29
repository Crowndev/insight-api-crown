insight-api-crown
=================

This package is under development. It may be unstable, or not work as expected.

NFT Protocol API
================

## `/nftprotocol/register`

Register a new NFT protocol.

Path:

`/nftprotocol/register/<protocolId>`

Query strings:

- `protocolName` String, required
- `ownerAddress` String, required
- `regSign` Number
- `metadataMimeType` String
- `metadataSchemaUri` String
- `isTransferable` Boolean
- `isMetadataEmbedded` Boolean
- `maxMetadataSize` Number

## `/nftprotocol/list`

List NFT protocol records on chain.

Path:

`/nftprotocol/list`

Query strings:

- `count` Number
- `skipFromTip` Number
- `height` Number
- `regTxOnly` Boolean

## `/nftprotocol/get`

Get an NFT protocol record by an NFT protocol ID.

Path:

`/nftprotocol/get/<protocolId>`

## `/nftprotocol/getbytxid`

Get an NFT protocol record by a transaction ID.

Path:

`/nftprotocol/getbytxid/<txid>`

## `/nftprotocol/ownerof`

Get address of the NFT protocol owner by using its protocol ID.

Path:

`/nftprotocol/ownerof/<protocolId>`

NFT API
=======

## `/nft/register`

Create and send a new non-fungible token transaction.

Path:

`/nft/register/<protocolId>/<tokenId>`

Query strings:

- `ownerAddress` String, required
- `metadataAdminAddress` String
- `metadata` String

## `/nft/list`

List nftoken records on chain.

Path:

`/nft/list`

Query strings:

- `protocolId` String
- `ownerAddress` String
- `count` Number
- `skipFromTip` Number
- `height` Number
- `regTxOnly` Boolean

## `/nft/get`

Get an nftoken record by an NFT protocol ID and token ID.

Path:

`/nft/get/<protocolId>/<tokenId>`

## `/nft/getbytxid`

Get an nftoken record by its registration transaction ID.

Path:

`/nft/getbytxid/<txid>`

## `/nft/ownerof`

Get address of the NFT owner by using its protocol ID and token ID.

Path:

`/nft/ownerof/<protocolId>/<tokenId>`

## `/nft/balanceof`

Get balance of NFTs belonging to a certain address within a protocol set or in a global set.

Path:

`/nft/balanceof/<ownerAddress>`

Query strings:

- `protocolId` String

## `/nft/totalsupply`

Get NFTs current total supply.

Path:

`/nft/totalsupply`

Query strings:

- `protocolId` String

Contributing
============

See `CONTRIBUTING.md` file.

License
=======

See `LICENSE` file.
