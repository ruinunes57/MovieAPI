import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";
import { nanoid } from 'nanoid'

@Entity('genders')
export class Gender {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @BeforeInsert()
    generateId() {
        this.id = nanoid();
    }
}
