import express, { Request, Response, NextFunction } from 'express';
import "reflect-metadata";
import { connection } from './data-source';
import storeRouter from './router/storeRouter';
import employeeRouter from './router/employeeRouter';
import invoiceRouter from './router/invoiceRouter';
import saleRouter from './router/saleRouter';
import viewRouter from './router/viewRouter';
import triggerRouter from './router/triggerRouter';

const app = express();


connection.initialize()
    .then(() => {
    })
    .catch((error) => console.log(error))
 
app.use(express.json());
 
app.use('/store', storeRouter);
app.use("/employee", employeeRouter);
app.use("/invoice", invoiceRouter);
app.use("/sale", saleRouter);
app.use("/view", viewRouter);
app.use("/trigger", triggerRouter);
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})
 
export default app;