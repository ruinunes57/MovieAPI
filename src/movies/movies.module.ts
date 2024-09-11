import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Gender} from "../genres/entities/gender.entity";
import {Movie} from "./entities/movie.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), TypeOrmModule.forFeature([Gender])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
