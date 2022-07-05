import dotenv from 'dotenv';

dotenv.config();

const envConfig = {
  MORALIS_API_KEY: process.env.MORALIS_API_KEY || '',
  PORT: process.env.PORT || 5000,
};

export default envConfig;
