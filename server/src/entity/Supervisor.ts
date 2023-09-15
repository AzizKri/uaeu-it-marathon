import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class Supervisor {

    @PrimaryColumn()
    id: string

    @Column()
    fname: string

    @Column()
    lname: string

    @Column()
    school: string

    @Column()
    teamId: string
}
