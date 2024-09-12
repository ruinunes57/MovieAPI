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
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    // Pass the data to the service to create a movie
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll(
      @Query('page') page?: number,
      @Query('limit') limit?: number
  ) {
    // Set default page and limit if not provided
    const pageNumber = page || 1;
    const limitNumber = limit || 5;

    // Validate that page number is greater than 0
    if (pageNumber < 1) {
      throw new BadRequestException('Page number must be greater than 0.');
    }

    // Validate that limit is greater than 0
    if (limitNumber < 1) {
      throw new BadRequestException('Limit must be greater than 0.');
    }

    // Return the paginated list of movies
    return this.moviesService.findAll(pageNumber, limitNumber);
  }

  @Get('search')
  async searchMovies(
      @Query('title') title?: string,
      @Query('gender') genderName?: string,
  ): Promise<Movie[]> {
    // Ensure that only one of 'title' or 'genre' is provided
    if (title && genderName) {
      throw new BadRequestException('You can only search by title OR genre, not both.');
    }

    // Ensure that at least one of 'title' or 'genre' is provided
    if (!title && !genderName) {
      throw new BadRequestException('At least title OR genre must be provided.');
    }

    // Call the service to perform the search
    return this.moviesService.search(title, genderName);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Fetch the movie by ID
    const movie = await this.moviesService.findOne(id);

    // Throw an exception if the movie is not found
    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    // Update the movie with the given ID and data
    const movie = await this.moviesService.update(id, updateMovieDto);

    // Throw an exception if the movie is not found
    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    // Remove the movie with the given ID
    const movie = await this.moviesService.remove(id);

    // Throw an exception if the movie is not found
    if (!movie) throw new NotFoundException('Movie not found');
  }
}
