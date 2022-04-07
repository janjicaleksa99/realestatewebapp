import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import agencyRouter from './routers/agency.routes';
import advertisementRouter from './routers/advertisement.routes';
import locationRouter from './routers/location.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

mongoose.connect('mongodb://localhost:27017/nekretnine2022', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router();
router.use('/user', userRouter);
router.use('/agency', agencyRouter);
router.use('/advertisement', advertisementRouter);
router.use('/location', locationRouter);


app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));