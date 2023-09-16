import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm"
import { Team } from "./Team"

@Entity()
export class Student {

    @PrimaryColumn()
    sid: string

    @Column()
    fname: string

    @Column()
    lname: string

    @Column()
    school: string

    @Column({nullable: true})
    grade: number

    @ManyToOne(() => Team, (team) => team.members, {
        nullable: true,
        cascade: true
    })
    team: Team
}
