import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.example.POSTGRES_HOST,
    port: 5432,
    username: process.env.example.POSTGRES_USER,
    password: process.env.example.POSTGRES_PASSWORD,
    database: process.env.example.POSTGRES_DB,
    synchronize: true,
    ssl: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
