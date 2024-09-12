import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { Gender } from "../genres/entities/gender.entity";

@Injectable()
export class MoviesService {
  constructor(
      // Injecting Movie and Gender repositories
      @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
      @InjectRepository(Gender) private readonly genderRepository: Repository<Gender>,
  ) {}

  // Create a new movie and associate it with genres
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, description, releaseDate, genres } = createMovieDto;

    // Find the genre entities that match the provided genre names
    const genreEntities = await this.genderRepository.findBy({
      name: In(genres),
    });

    // Create a new movie entity with the given details and associated genres
    const movie = this.movieRepository.create({
      title,
      description,
      releaseDate,
      genders: genreEntities,  // Associate the found genres with the movie
    });

    // Save the movie entity in the database
    return this.movieRepository.save(movie);
  }

  // Find all movies with pagination
  async findAll(page: number, limit: number): Promise<{ data: Movie[]; total: number }> {
    const skip = (page - 1) * limit;  // Calculate how many movies to skip based on the page number

    // Find movies with pagination and return the total count
    const [data, total] = await this.movieRepository.findAndCount({
      skip: skip,  // Number of movies to skip
      take: limit,  // Number of movies to take
      relations: ['genders'],  // Include the associated genres
    });

    return {
      data,  // Return the movies for the current page
      total,  // Return the total number of movies
    };
  }

  // Find a movie by its ID
  findOne(id: string) {
    return this.movieRepository.findOneBy({ id });
  }

  // Search for movies by title or genre
  async search(title?: string, genderName?: string): Promise<Movie[]> {
    // If searching by title
    if (title) {
      return this.movieRepository.find({
        where: { title },  // Find movies where the title matches
        relations: ['genders'],  // Include the associated genres
      });
    }

    // If searching by genre
    if (genderName) {
      // Find the genre by its name
      const gender = await this.genderRepository.findOne({ where: { name: genderName } });
      if (gender) {
        // Find movies associated with the found genre
        return this.movieRepository.find({
          where: { genders: gender },  // Match movies by genre
          relations: ['genders'],  // Include the associated genres
        });
      } else {
        return null;  // Return null if the genre was not found
      }
    }

    return null;  // Return null if neither title nor genre is provided
  }

  // Update a movie by its ID
  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { genres, ...movieData } = updateMovieDto;

    // Find the movie by its ID, including associated genres
    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['genders'] });

    if (!movie) return null;  // Return null if the movie was not found

    // Find and update the genres if they were provided
    let genreEntities = [];
    if (genres && genres.length > 0) {
      genreEntities = await this.genderRepository.findBy({
        name: In(genres),
      });
    }

    // Merge the existing movie data with the updated data
    const updatedMovie = this.movieRepository.merge(movie, movieData);

    // Update the associated genres if any were provided, otherwise keep the existing ones
    updatedMovie.genders = genreEntities.length ? genreEntities : movie.genders;

    // Save and return the updated movie
    return this.movieRepository.save(updatedMovie);
  }

  // Remove a movie by its ID
  async remove(id: string) {
    // Find the movie by its ID
    const movie = await this.movieRepository.findOneBy({ id });
    if (!movie) return null;  // Return null if the movie was not found

    // Remove the movie from the database
    return this.movieRepository.remove(movie);
  }
}
