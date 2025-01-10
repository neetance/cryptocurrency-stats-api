import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/APIRoutes';

dotenv.config();

mongoose
   .connect(process.env.MONGO_URL!)
   .then(() => console.log('DB connected'))
   .catch((err) => {
      console.error(err);
   });

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
