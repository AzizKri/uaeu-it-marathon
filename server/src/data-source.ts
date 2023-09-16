import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

import { Student } from "./entity/Student";
import { Team } from "./entity/Team";
import { Supervisor } from "./entity/Supervisor";

const { POSTGRES_DB_DEV, POSTGRES_HOST_DEV, POSTGRES_USER_DEV, POSTGRES_PASSWORD_DEV } = process.env;

export const AppDataSource = new DataSource({
    type: "postgres",
    host: POSTGRES_HOST_DEV,
    port: 5432,
    username: POSTGRES_USER_DEV,
    password: POSTGRES_PASSWORD_DEV,
    database: POSTGRES_DB_DEV,
    synchronize: true,
    ssl: true,
    logging: false,
    entities: [Student, Team, Supervisor],
    migrations: [],
    subscribers: [],
});
