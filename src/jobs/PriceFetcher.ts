/**
 * This job runs in the background every 2 hours and fetches the price of a given token from the coingecko API
 * and stores it in the database.
 */

import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Agenda } from 'agenda';
import CryptoCurrencyData from '../models/CryptoCurrencyData';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });
const agenda = new Agenda({
   db: { address: process.env.MONGODB_URI!, collection: 'jobs' },
   processEvery: '1 minute',
});

agenda.define('fetch price', async () => {
   try {
      const res = await axios.get(
         'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cmatic-network&vs_currencies=usd&include_market_cap=true&include_24hr_change=true'
      );
      const data = res.data;

      const bitcoinData = {
         name: 'Bitcoin',
         symbol: 'BTC',
         data: {
            price: data.bitcoin.usd,
            marketCap: data.bitcoin.usd_market_cap,
            change24h: data.bitcoin.usd_24h_change,
         },
         timestamp: new Date(),
      };

      const ethereumData = {
         name: 'Ethereum',
         symbol: 'ETH',
         data: {
            price: data.ethereum.usd,
            marketCap: data.ethereum.usd_market_cap,
            change24h: data.ethereum.usd_24h_change,
         },
         timestamp: new Date(),
      };

      const maticData = {
         name: 'Matic Network',
         symbol: 'MATIC',
         data: {
            price: data['matic-network'].usd,
            marketCap: data['matic-network'].usd_market_cap,
            change24h: data['matic-network'].usd_24h_change,
         },
         timestamp: new Date(),
      };

      await CryptoCurrencyData.create(bitcoinData);
      await CryptoCurrencyData.create(ethereumData);
      await CryptoCurrencyData.create(maticData);

      console.log(
         `Price data fetched and stored in the database at ${new Date()}`
      );
   } catch (error) {
      console.error(error);
   }
});

(async () => {
   await agenda.start();
   await agenda.every('2 hours', 'fetch price');
})();
