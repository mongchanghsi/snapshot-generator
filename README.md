# Snapshot generator

To generate a json file containing the list of unique owners of a particular collection. This json can be used for either populating your on-chain whitelist or off-chain whitelist.

## How to use

1. Run `npm install`
2. Run `cp .env.template .env`
3. Go to [https://moralis.io/](https://moralis.io/) to get your API V3 key and populate in `.env`
4. Run `npm run dev`
5. Access the endpoint via port `5000`

## API Structure

`http://localhost:5000/snapshot?contractAddress=${contractAddress}&chain=${chain}`

- Contract Address would be the collection address
- Chain would be either `eth` if is under Ethereum mainnet or `polygon` under Poylgon network

## Sample APIs

- Getting list from a collection in the Ethereum Mainnet
  [http://localhost:5000/snapshot?contractAddress=0xeecd1c042c378676ee1985dd66481b2589a809f9&chain=eth](http://localhost:5000/snapshot?contractAddress=0xeecd1c042c378676ee1985dd66481b2589a809f9&chain=eth)

- Getting list from a collection in the Polygon network
  [http://localhost:5000/snapshot?contractAddress=0xa4c540000FBB0F1746982B79cc854C6E06a8946C&chain=polygon](http://localhost:5000/snapshot?contractAddress=0xa4c540000FBB0F1746982B79cc854C6E06a8946C&chain=polygon)
