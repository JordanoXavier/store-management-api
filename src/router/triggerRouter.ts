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

router.post('/update-sales-count', async (req: Request, res: Response) => {
    try {
        const increaseSalesTriggerQuery = `
            CREATE TRIGGER increase_sales_count_on_sale_create
            AFTER INSERT ON sale
            FOR EACH ROW
            BEGIN
                UPDATE employee
                SET salesCount = salesCount + 1
                WHERE id = (SELECT employeeId FROM invoice WHERE id = NEW.invoiceId);
            END;
        `;

        const decreaseSalesTriggerQuery = `
            CREATE TRIGGER decrease_sales_count_on_sale_delete
            AFTER DELETE ON sale
            FOR EACH ROW
            BEGIN
                UPDATE employee
                SET salesCount = salesCount - 1
                WHERE id = (SELECT employeeId FROM invoice WHERE id = OLD.invoiceId);
            END;
        `;

        await connection.query(increaseSalesTriggerQuery);
        await connection.query(decreaseSalesTriggerQuery);

        res.status(200).send('Triggers criadas com sucesso.');
    } catch (error) {
        console.error('Erro ao criar as triggers:', error);
        res.status(500).send('Erro ao criar as triggers.');
    }
});



export default router;
