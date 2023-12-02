import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Invoice } from "./Invoice"
import { Material } from "./Material"

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

    @OneToMany(() => Material, material => material.sale)
    material: Material[]

}