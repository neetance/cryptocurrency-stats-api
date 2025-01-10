import { model, Schema } from 'mongoose';

export interface IDataParams extends Document {
   price: number;
   marketCap: number;
   change24h: number;
   timestamp: Date;
}

const DataParamsSchema = new Schema({
   price: { type: Number, required: true },
   marketCap: { type: Number, required: true },
   change24h: { type: Number, required: true },
   timestamp: { type: Date, required: true },
});

const DataParams = model<IDataParams>('DataParams', DataParamsSchema);

export default DataParams;
