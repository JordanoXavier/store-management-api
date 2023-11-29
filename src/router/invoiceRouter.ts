import express, { Request, Response } from 'express';
import { Employee } from '../entity/Employee';
import { connection } from '../data-source';
import { Store } from '../entity/Store';
import { Invoice } from '../entity/Invoice';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const invoice = new Invoice();
    invoice.customerName = req.body.customerName;
    invoice.emissionDate = req.body.emissionDate;
    invoice.totalValue = req.body.totalValue;
    invoice.employeeName = req.body.employeeName;
    if(req.body.storeId) {
        const id = Number(req.body.storeId)
        const store = await connection.manager.findOneBy(Store, { id });
        if(!store) {
            res.status(404).send("Store not found");
            return;
        }
        invoice.store = store;
    }
    if(req.body.employeeId) {
        const id = Number(req.body.employeeId)
        const employee = await connection.manager.findOneBy(Employee, { id });
        if(!employee) {
            res.status(404).send("Employee not found");
            return;
        }
        invoice.employee = employee;
    }
    
    const result = await connection.manager.save(invoice);
    res.send(result);
});

router.get('/', async (req: Request, res: Response) => {
    const invoices = await connection.manager.find(Invoice);
    res.send(invoices);
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const invoice = await connection.manager.findOneBy(Invoice, { id });
    res.send(invoice);
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const invoice = await connection.manager.findOneBy(Invoice, { id });
    if(!invoice) {
        res.status(404).send("Invoice not found");
        return;
    }

    invoice.customerName = req.body.customerName;
    invoice.emissionDate = req.body.emissionDate;
    invoice.totalValue = req.body.totalValue;
    invoice.employeeName = req.body.employeeName;
    if(req.body.storeId) {
        const id = Number(req.body.storeId)
        const store = await connection.manager.findOneBy(Store, { id });
        if(!store) {
            res.status(404).send("Store not found");
            return;
        }
        invoice.store = store;
    }
    if(req.body.employeeId) {
        const id = Number(req.body.employeeId)
        const employee = await connection.manager.findOneBy(Employee, { id });
        if(!employee) {
            res.status(404).send("Employee not found");
            return;
        }
        invoice.employee = employee;
    }
    
    const result = await connection.manager.save(invoice);
    res.send(result);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const invoice = await connection.manager.findOneBy(Invoice, { id });
    if(!invoice) {
        res.status(404).send("Invoice not found");
        return;
    }

    const result = await connection.manager.remove(invoice);
    res.send(result);
});

export default router;
