import "reflect-metadata"
import { DataSource } from "typeorm"

export const connection = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: "fdb",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
})
