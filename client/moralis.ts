import axios, { AxiosInstance } from 'axios';
import envConfig from '../utils/envConfig';

let moralisAPIURL = 'https://deep-index.moralis.io/api/v2';

enum ChainType {
  POLYGON = 'polygon',
  MAINNET = 'eth',
}

const moralisApi: AxiosInstance = axios.create({
  baseURL: moralisAPIURL,
  timeout: 30000, // 30 secs
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': envConfig.MORALIS_API_KEY,
  },
});

export const getNumberOfTokensFromContractAddress = async (
  contractAddress: string,
  chain: ChainType
) => {
  try {
    const response: any = await moralisApi.get(
      `/nft/${contractAddress}/owners?chain=${chain}&format=decimal&limit=100`
    );
    if (response.status === 200) {
      return response.data.total;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getNameOfCollection = async (
  contractAddress: string,
  chain: ChainType
) => {
  try {
    const response: any = await moralisApi.get(
      `/nft/${contractAddress}/metadata?chain=${chain}`
    );
    if (response.status === 200) {
      return response.data.name;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getTokensOwnerFromContractAddress = async (
  contractAddress: string,
  chain: ChainType,
  cursor: string
) => {
  try {
    let formulateUrl = `/nft/${contractAddress}/owners?chain=${chain}&format=decimal&limit=100`;
    if (cursor.length > 0) {
      formulateUrl += `&cursor=${cursor}`;
    }
    const response: any = await moralisApi.get(formulateUrl);
    const nextCursor = response.data.cursor as string;
    const listOfTokensMetadata = response.data.result;
    const listOfTokenOwners = [];
    for (let i = 0; i < listOfTokensMetadata.length; i++) {
      listOfTokenOwners.push(listOfTokensMetadata[i].owner_of);
    }

    return { nextCursor, listOfTokenOwners };
  } catch (error) {
    return { nextCursor: '', listOfTokenOwners: [] };
  }
};
