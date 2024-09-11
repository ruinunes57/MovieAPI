import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Gender} from "./entities/gender.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
