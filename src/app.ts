import express, { Request, Response, NextFunction } from 'express';
import helloRouter from './routers/helloRouter';

const app = express();
 
app.use(express.json());
 
app.use('/hello', helloRouter);
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})
 
export default app;