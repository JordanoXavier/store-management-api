import express, { Request, Response } from 'express';
import { connection } from '../data-source';
import { Sale } from '../entity/Sale';
import { Invoice } from '../entity/Invoice';
import { Material } from '../entity/Material';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const sale = new Sale();
    sale.materialName = req.body.materialName;
    sale.quantity = req.body.quantity;
    sale.unitValue = req.body.unitValue;
    sale.totalItemValue = req.body.totalItemValue;
    if(req.body.invoiceId) {
        const id = Number(req.body.invoiceId)
        const invoice = await connection.manager.findOneBy(Invoice, { id });
        if(!invoice) {
            res.status(404).send("Invoice not found");
            return;
        }
        sale.invoice = invoice;
    }
    if(req.body.materialId) {
        const id = Number(req.body.materialId)
        const material = await connection.manager.findOneBy(Material, { id });
        if(!material) {
            res.status(404).send("Material not found");
            return;
        }
        sale.material = material;
    }
    
    const result = await connection.manager.save(sale);
    res.send(result);
});

router.get('/', async (req: Request, res: Response) => {
    const sales = await connection.manager.find(Sale);
    res.send(sales);
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const sale = await connection.manager.findOneBy(Sale, { id });
    res.send(sale);
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const sale = await connection.manager.findOneBy(Sale, { id });
    if(!sale) {
        res.status(404).send("Sale not found");
        return;
    }

    sale.materialName = req.body.materialName;
    sale.quantity = req.body.quantity;
    sale.unitValue = req.body.unitValue;
    sale.totalItemValue = req.body.totalItemValue;
    if(req.body.invoiceId) {
        const id = Number(req.body.invoiceId)
        const invoice = await connection.manager.findOneBy(Invoice, { id });
        if(!invoice) {
            res.status(404).send("Invoice not found");
            return;
        }
        sale.invoice = invoice;
    }
    if(req.body.materialId) {
        const id = Number(req.body.materialId)
        const material = await connection.manager.findOneBy(Material, { id });
        if(!material) {
            res.status(404).send("Material not found");
            return;
        }
        sale.material = material;
    }
    
    const result = await connection.manager.save(sale);
    res.send(result);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const sale = await connection.manager.findOneBy(Sale, { id });
    if(!sale) {
        res.status(404).send("Sale not found");
        return;
    }

    const result = await connection.manager.remove(sale);
    res.send(result);
});

export default router;
