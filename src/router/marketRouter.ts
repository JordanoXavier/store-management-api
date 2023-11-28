import express, { Request, Response } from 'express';
import { Market } from '../entity/Market';
import { connection } from '../data-source';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Get Market');
});

router.post('/', async (req: Request, res: Response) => {
    const market = new Market();
    market.name = req.body.name;

    const result = await connection.manager.save(market);
    res.send(result);
}
);

export default router;
