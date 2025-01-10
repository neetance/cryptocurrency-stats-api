import CryptoCurrencyData from '../models/CryptoCurrencyData';
import { Request, Response } from 'express';

export const getCoinData = async (req: Request, res: Response) => {
   try {
      const coin = req.query.coin;
      if (!coin) {
         res.status(400).json({ error: 'Coin parameter is required' });
         return;
      }

      const data = await CryptoCurrencyData.find({ name: coin as string })
         .sort({ timestamp: -1 })
         .limit(1);
      res.status(200).json(data);
   } catch (err) {
      res.status(500).json({ error: err });
   }
};

export const getDeviation = async (req: Request, res: Response) => {
   try {
      const coin = req.query.coin;
      if (!coin) {
         res.status(400).json({ error: 'Coin parameter is required' });
         return;
      }

      const data = await CryptoCurrencyData.find({ name: coin as string })
         .sort({ timestamp: -1 })
         .limit(100);

      const prices = data.map((d) => d.data.price);
      const average = prices.reduce((a, b) => a + b) / prices.length;
      const squaredDiffs = prices.map((price) => Math.pow(price - average, 2));
      const variance =
         squaredDiffs.reduce((a, b) => a + b) / squaredDiffs.length;
      const deviation = Math.sqrt(variance);

      res.status(200).json({ deviation });
   } catch (err) {
      res.status(500).json({ error: err });
   }
};
