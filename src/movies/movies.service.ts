import {Injectable} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {Movie} from "./entities/movie.entity";
import {Gender} from "../genres/entities/gender.entity";

@Injectable()
export class MoviesService {
  constructor(
      @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>,
      @InjectRepository(Gender) private readonly genderRepository: Repository<Gender>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, description, releaseDate, genres } = createMovieDto;

    const genreEntities = await this.genderRepository.findBy({
      name: In(genres),
    });

    const movie = this.movieRepository.create({
      title,
      description,
      releaseDate,
      genders: genreEntities,
    });

    return this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find({ relations: ['genders'] });
  }

  findOne(id: string) {
    return this.movieRepository.findOneBy({ id });
  }

  async search(title?: string, genderName?: string): Promise<Movie[]> {
    if (title) {
      return this.movieRepository.find({
        where: { title },
        relations: ['genders'],
      });
    }

    if (genderName) {
      const gender = await this.genderRepository.findOne({ where: { name: genderName } });
      if (gender) {
        return this.movieRepository.find({
          where: { genders: gender },
          relations: ['genders'],
        });
      } else {
        return null;
      }
    }

    return null;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const { genres, ...movieData } = updateMovieDto;

    const movie = await this.movieRepository.findOne({ where: { id }, relations: ['genders'] });

    if (!movie) return null;

    let genreEntities = [];
    if (genres && genres.length > 0) {
      genreEntities = await this.genderRepository.findBy({
        name: In(genres),
      });
    }

    const updatedMovie = this.movieRepository.merge(movie, movieData);

    updatedMovie.genders = genreEntities.length ? genreEntities : movie.genders;

    return this.movieRepository.save(updatedMovie);
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOneBy({ id });
    if(!movie) return null;
    return this.movieRepository.remove(movie);
  }
}
