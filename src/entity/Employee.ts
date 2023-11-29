import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Store } from "./Store"

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => Store, store => store.employees)
  store: Store
}