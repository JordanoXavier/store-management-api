import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Sale } from "./Sale"

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Sale, sale => sale.material)
    sale: Sale[]
}