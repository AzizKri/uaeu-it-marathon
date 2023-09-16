import { Entity, PrimaryColumn, OneToMany, Column, OneToOne, JoinColumn } from "typeorm"
import { Student } from "./Student"
import { Supervisor } from "./Supervisor"

@Entity()
export class Team {

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    school: string

    @OneToMany(() => Student, (student) => student.team)
    members: Student[]

    @OneToOne(() => Supervisor)
    @JoinColumn()
    supervisor: Supervisor
}
