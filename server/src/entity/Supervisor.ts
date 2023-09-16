import { Entity, PrimaryColumn, Column, OneToOne } from "typeorm"
import { Team } from "./Team"

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

    @OneToOne(() => Team, {
        nullable: true,
        cascade: true
    })
    team: Team
}
