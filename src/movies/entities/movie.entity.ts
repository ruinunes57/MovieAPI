import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { nanoid } from 'nanoid';
import { Gender } from "../../genres/entities/gender.entity";

@Entity('movies')  // Define this class as an entity for the "movies" table
export class Movie {
    @PrimaryColumn()  // Set "id" as the primary column
    id: string;

    @Column()  // Define "title" as a regular column
    title: string;

    @Column()  // Define "description" as a regular column
    description: string;

    @Column()  // Define "releaseDate" as a regular column of type Date
    releaseDate: Date;

    // Define a Many-to-Many relationship between Movie and Gender
    @ManyToMany(() => Gender, gender => gender.movies, {
        cascade: true,  // Automatically save/update related entities (genders) when a movie is saved/updated
    })
    @JoinTable()  // Create a join table to link movies and genders
    genders: Gender[];

    // Before inserting a new movie, generate a unique id using nanoid
    @BeforeInsert()
    generateId() {
        this.id = nanoid();  // Generate a unique ID for the movie
    }
}
