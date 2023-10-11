import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { Student } from "./Student"
import { Supervisor } from "./Supervisor"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @OneToOne(() => Student || Supervisor)
    user: string
}
