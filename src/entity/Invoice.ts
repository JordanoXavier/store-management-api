//nome do cliente
//data de emissão
//valor total da Nota fiscal
//nome do empregado responsável pela venda
//nome do material vendido
//quantidade deste material
//valor unitário
//valor total do item de material vendido

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee"
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

    @Column()
    materialName: string

    @Column()
    quantity: number

    @Column()
    unitValue: number

    @Column()
    totalItemValue: number

    @ManyToOne(() => Employee, employee => employee.invoices)
    employee: Employee

    @ManyToOne(() => Store , store => store.invoices)
    store: Store
}