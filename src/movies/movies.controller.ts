import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

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
