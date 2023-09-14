import { Entity, PrimaryColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryColumn()
    email: string

    @Column()
    token: string
}
