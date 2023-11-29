import express, { Request, Response } from 'express';
import { connection } from '../data-source';

const router = express.Router();

router.post('/delete-sales-cascade', async (req: Request, res: Response) => {
    try {
        const triggerExistsQuery = `
            SELECT TRIGGER_NAME
            FROM information_schema.triggers
            WHERE TRIGGER_NAME = 'delete_sales_on_invoice_delete';
        `;

        const triggerCheck = await connection.query(triggerExistsQuery);

        if (triggerCheck.length === 0) {
            const createTriggerQuery = `
                CREATE TRIGGER delete_sales_on_invoice_delete
                BEFORE DELETE ON invoice
                FOR EACH ROW
                BEGIN
                    DELETE FROM sale
                    WHERE invoiceId = OLD.id;
                END;
            `;

            await connection.query(createTriggerQuery);
            res.status(200).send('Trigger criada com sucesso.');
        } else {
            res.status(200).send('A trigger já existe.');
        }
    } catch (error) {
        console.error('Erro ao criar a trigger:', error);
        res.status(500).send('Erro ao criar a trigger.');
    }
});



export default router;
