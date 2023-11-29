import express, { Request, Response } from 'express';
import { Store } from '../entity/Store';
import { connection } from '../data-source';

const router = express.Router();

router.get('/count-employee-in-site/', async (req: Request, res: Response) => {
    const viewExistsQuery = `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.VIEWS
        WHERE TABLE_NAME = 'employees_count_per_store';
    `;

    const viewCheck = await connection.query(viewExistsQuery);

    if (viewCheck.length === 0) {
        const createEmployeesCountViewQuery = `
            CREATE VIEW employees_count_per_store AS
            SELECT s.id AS store_id, s.name AS store_name, COUNT(e.id) AS employee_count
            FROM store s
            LEFT JOIN employee e ON s.id = e.storeId
            GROUP BY s.id;
        `;

        await connection.query(createEmployeesCountViewQuery);
    }

    const employeesCountPerStore = await connection.query(`
        SELECT *
        FROM employees_count_per_store;
    `);

    res.send(employeesCountPerStore);
});



export default router;
