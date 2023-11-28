import express, { Request, Response } from 'express';
import { Store } from '../entity/Store';
import { connection } from '../data-source';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const store = new Store();
    store.name = req.body.name;
    const result = await connection.manager.save(store);
    res.send(result);
});

router.get('/', async (req: Request, res: Response) => {
    const stores = await connection.manager.find(Store);
    res.send(stores);
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const store = await connection.manager.findOneBy(Store, { id });
    res.send(store);
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const store = await connection.manager.findOneBy(Store, { id });
    if(!store) {
        res.status(404).send("Store not found");
        return;
    }

    store.name = req.body.name;
    const result = await connection.manager.save(store);
    res.send(result);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const store = await connection.manager.findOneBy(Store, { id });
    if(!store) {
        res.status(404).send("Store not found");
        return;
    }

    const result = await connection.manager.remove(store);
    res.send(result);
});

export default router;
