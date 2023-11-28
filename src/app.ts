import express, { Request, Response, NextFunction } from 'express';
import storeRouter from './router/storeRouter';
import "reflect-metadata";
import { connection } from './data-source';

const app = express();


connection.initialize()
    .then(() => {
    })
    .catch((error) => console.log(error))
 
app.use(express.json());
 
app.use('/store', storeRouter);
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})
 
export default app;