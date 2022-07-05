import express, { Express, Request, Response } from 'express';
import envConfig from './utils/envConfig';
import {
  getNameOfCollection,
  getNumberOfTokensFromContractAddress,
  getTokensOwnerFromContractAddress,
} from './client/moralis';
import { removeDuplicatesInList } from './utils';

enum ChainType {
  POLYGON = 'polygon',
  MAINNET = 'eth',
}

const app = express();
const port = envConfig.PORT;

// Get all tokens holder from a collection
app.get('/snapshot', async (req: Request, res: Response) => {
  const contractAddress = req.query.contractAddress as string;
  const chain = req.query.chain as ChainType;
  let cursor: string = '';
  let output: string[] = [];

  if (!contractAddress) {
    return res.status(400).send({ error: 'No Contract Address' });
  }

  if (!chain) {
    return res
      .status(400)
      .send({ error: 'No valid chain. Either polygon or eth' });
  }

  const collectionName = await getNameOfCollection(contractAddress, chain);

  // Initial Call to Moralis to find out the collection number
  const totalNumberOfTokens = await getNumberOfTokensFromContractAddress(
    contractAddress,
    chain
  );

  if (!totalNumberOfTokens)
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again.' });

  const numberOfTimesToCallApi = Math.ceil(totalNumberOfTokens / 100);

  for (let i = 0; i < numberOfTimesToCallApi; i++) {
    const { nextCursor, listOfTokenOwners } =
      await getTokensOwnerFromContractAddress(contractAddress, chain, cursor);
    cursor = nextCursor;
    output = output.concat(listOfTokenOwners);
  }

  output = removeDuplicatesInList(output);

  // Automatically downloads as json
  let json = JSON.stringify(output);
  let filename = `${collectionName}.json`;
  let mimetype = 'application/json';
  res.setHeader('Content-Type', mimetype);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.status(200).send(json);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
