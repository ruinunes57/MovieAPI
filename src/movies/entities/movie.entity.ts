import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from "typeorm";
import { nanoid } from 'nanoid'
import {Gender} from "../../genres/entities/gender.entity";

@Entity('movies')
export class Movie {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    releaseDate: Date;

    @ManyToMany(() => Gender, gender => gender.movies, {
        cascade: true,
    })

    @JoinTable()
    genders: Gender[];

    @BeforeInsert()
    generateId() {
        this.id = nanoid();
    }
}
