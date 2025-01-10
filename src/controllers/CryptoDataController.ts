import CryptoCurrencyData from '../models/CryptoCurrencyData';
import { Request, Response } from 'express';

export const getCoinData = async (req: Request, res: Response) => {
   try {
      let coin = req.query.coin as string;
      if (!coin) {
         res.status(400).json({ error: 'Coin parameter is required' });
         return;
      }

      coin = coin.charAt(0).toUpperCase() + coin.slice(1);

      const data = await CryptoCurrencyData.find({ name: coin as string })
         .sort({ timestamp: -1 })
         .limit(1);

      res.status(200).json({
         name: data[0].name,
         data: data[0].data,
         timestamp: data[0].timestamp,
      });
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const getDeviation = async (req: Request, res: Response) => {
   try {
      let coin = req.query.coin as string;
      if (!coin) {
         res.status(400).json({ error: 'Coin parameter is required' });
         return;
      }

      coin = coin.charAt(0).toUpperCase() + coin.slice(1);

      const data = await CryptoCurrencyData.find({ name: coin as string })
         .sort({ timestamp: -1 })
         .limit(100);

      const prices = data.map((d) => d.data.price);
      const average = prices.reduce((a, b) => a + b) / prices.length;
      const squaredDiffs = prices.map((price) => Math.pow(price - average, 2));
      const variance =
         squaredDiffs.reduce((a, b) => a + b) / squaredDiffs.length;
      const deviation = Math.sqrt(variance);

      res.status(200).json({ name: coin, deviation });
   } catch (err) {
      res.status(500).json({ error: err });
   }
};
