import { model, Schema } from 'mongoose';

export interface ICryptoCurrencyData extends Document {
   name: string;
   symbol: string;
   data: {
      price: number;
      marketCap: number;
      change24h: number;
   };
   timestamp: Date;
}

const CryptoCurrencyDataSchema = new Schema({
   name: { type: String, required: true },
   symbol: { type: String, required: true },
   data: {
      price: { type: Number, required: true },
      marketCap: { type: Number, required: true },
      change24h: { type: Number, required: true },
   },
   timestamp: { type: Date, required: true },
});

const CryptoCurrencyData = model<ICryptoCurrencyData>(
   'CryptoCurrencyData',
   CryptoCurrencyDataSchema
);

export default CryptoCurrencyData;
