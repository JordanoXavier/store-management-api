import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column()
  name: string | undefined
}