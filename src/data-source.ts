import "reflect-metadata"
import { DataSource } from "typeorm"


export const connection = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123",
  database: "fdb",
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: [],
})