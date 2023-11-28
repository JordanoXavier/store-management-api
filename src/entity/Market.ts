import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  name: string | undefined
}