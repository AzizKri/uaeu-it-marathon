import "reflect-metadata"
import { DataSource } from "typeorm"

import { Student } from "./entity/Student"
import { Team } from "./entity/Team"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST_DEV,
    port: 5432,
    username: process.env.POSTGRES_USER_DEV,
    password: process.env.POSTGRES_PASSWORD_DEV,
    database: process.env.POSTGRES_DB_DEV,
    synchronize: true,
    ssl: true,
    logging: false,
    entities: [Student, Team],
    migrations: [],
    subscribers: [],
})
