import express, { Request, Response } from 'express';
import { Employee } from '../entity/Employee';
import { connection } from '../data-source';
import { Store } from '../entity/Store';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const employee = new Employee();
    employee.name = req.body.name;

    if(req.body.storeId) {
        const id = Number(req.body.storeId)
        const store = await connection.manager.findOneBy(Store, { id });
        if(!store) {
            res.status(404).send("Store not found");
            return;
        }
        employee.store = store;
    }
    employee.salesCount = 0;
    const result = await connection.manager.save(employee);
    res.send(result);
});

router.get('/', async (req: Request, res: Response) => {
    const employees = await connection.manager.find(Employee);
    res.send(employees);
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const employee = await connection.manager.findOneBy(Employee, { id });
    res.send(employee);
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const employee = await connection.manager.findOneBy(Employee, { id });
    if(!employee) {
        res.status(404).send("Employee not found");
        return;
    }
    if(req.body.storeId) {
        const id = Number(req.body.storeId)
        const store = await connection.manager.findOneBy(Store, { id });
        if(!store) {
            res.status(404).send("Store not found");
            return;
        }
        employee.store = store;
    }

    employee.name = req.body.name;
    const result = await connection.manager.save(employee);
    res.send(result);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const employee = await connection.manager.findOneBy(Employee, { id });
    if(!employee) {
        res.status(404).send("Employee not found");
        return;
    }

    const result = await connection.manager.remove(employee);
    res.send(result);
});

router.get('/:id/invoices', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const employee = await connection.manager.findOneBy(Employee, { id });
    if(!employee) {
        res.status(404).send("Employee not found");
        return;
    }

    const invoices = await connection.manager.findBy("Invoice", { employee });
    res.send(invoices);
});

export default router;
