import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Invoice } from "./Invoice"
import { Store } from "./Store"

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Store, store => store.employees)
  store: Store

  @OneToMany(() => Invoice, invoice => invoice.employee)
  invoices: Invoice[]
}