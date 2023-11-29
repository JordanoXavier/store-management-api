import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee"
import { Sale } from "./Sale"
import { Store } from "./Store"

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    customerName: string

    @Column()
    emissionDate: string

    @Column()
    totalValue: number

    @Column()
    employeeName: string

    @ManyToOne(() => Employee, employee => employee.invoices)
    employee: Employee

    @ManyToOne(() => Store , store => store.invoices)
    store: Store

    @OneToMany(() => Sale, sale => sale.invoice)
    sales: Sale[]
}