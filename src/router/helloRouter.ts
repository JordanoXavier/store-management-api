import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

router.delete('/aa', (req: Request, res: Response) => {
    res.send('Hello World!');
});

export default router;
