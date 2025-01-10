import { model, Schema } from 'mongoose';
import DataParams, { IDataParams } from './DataParams';

export interface ICryptoCurrencyData extends Document {
   name: string;
   symbol: string;
   data: IDataParams[];
}

const CryptoCurrencyDataSchema = new Schema({
   name: { type: String, required: true },
   symbol: { type: String, required: true },
   data: [
      {
         type: Schema.Types.ObjectId,
         ref: 'DataParams',
         required: true,
      },
   ],
});

const CryptoCurrencyData = model<ICryptoCurrencyData>(
   'CryptoCurrencyData',
   CryptoCurrencyDataSchema
);

export default CryptoCurrencyData;
