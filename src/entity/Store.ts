import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Employee } from "./Employee"
import { Invoice } from "./Invoice"

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Employee, employee => employee.store)
  employees: Employee[]

  @OneToMany(() => Invoice, invoice => invoice.store)
  invoices: Invoice[]
}