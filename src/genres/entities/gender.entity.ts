import {BeforeInsert, Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";
import { nanoid } from 'nanoid'
import {Movie} from "../../movies/entities/movie.entity";

@Entity('genres')
export class Gender {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Movie, movie => movie.genders)
    movies: Movie[];

    @BeforeInsert()
    generateId() {
        this.id = nanoid();
    }
}
