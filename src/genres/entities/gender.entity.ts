import { BeforeInsert, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { nanoid } from 'nanoid';
import { Movie } from "../../movies/entities/movie.entity";

@Entity('genres')  // Define this class as an entity for the "genres" table (for Gender)
export class Gender {
    @PrimaryColumn()  // Set "id" as the primary column for unique identifiers
    id: string;

    @Column()  // Define "name" as a regular column
    name: string;

    // Define a Many-to-Many relationship between Gender and Movie
    @ManyToMany(() => Movie, movie => movie.genders)
    movies: Movie[];  // A genre can be associated with multiple movies

    // Before inserting a new gender, generate a unique id using nanoid
    @BeforeInsert()
    generateId() {
        this.id = nanoid();  // Generate a unique ID for the genre
    }
}
