import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
  BadRequestException
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {Movie} from "./entities/movie.entity";

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('search')
  async searchMovies(
      @Query('title') title?: string,
      @Query('gender') genderName?: string,
  ): Promise<Movie[]> {
    if (title && genderName) {
      throw new BadRequestException('You can only search by title OR genre, not both.');
    }

    if (!title && !genderName) {
      throw new BadRequestException('At least title OR genre must be provided.');
    }

    return this.moviesService.search(title, genderName);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(id);
    if(!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const movie = await this.moviesService.update(id, updateMovieDto);
    if(!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const movie = await this.moviesService.remove(id);
    if(!movie) throw new NotFoundException('Movie not found');
  }
}
