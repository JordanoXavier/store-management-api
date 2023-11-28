import express, { Request, Response } from 'express';
import { Market } from '../entity/Market';
import { connection } from '../data-source';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    const market = new Market();
    market.name = req.body.name;
    const result = await connection.manager.save(market);
    res.send(result);
});

router.get('/', async (req: Request, res: Response) => {
    const markets = await connection.manager.find(Market);
    res.send(markets);
});

router.get('/:id', async (req: Request, res: Response) => {
    console.log("getting by id")
    const id = Number(req.params.id)
    const market = await connection.manager.findOneBy(Market, { id });
    res.send(market);
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const market = await connection.manager.findOneBy(Market, { id });
    if(!market) {
        res.status(404).send("Market not found");
        return;
    }

    market.name = req.body.name;
    const result = await connection.manager.save(market);
    res.send(result);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const market = await connection.manager.findOneBy(Market, { id });
    if(!market) {
        res.status(404).send("Market not found");
        return;
    }

    const result = await connection.manager.remove(market);
    res.send(result);
});

export default router;
