import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Invoice } from "./Invoice"

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    materialName: string

    @Column()
    quantity: number

    @Column()
    unitValue: number

    @Column()
    totalItemValue: number

    @ManyToOne(() => Invoice, invoice => invoice.sales)
    invoice: Invoice

}