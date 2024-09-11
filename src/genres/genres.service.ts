import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import {Repository} from "typeorm";
import {Gender} from "./entities/gender.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GenresService {
  constructor(
      @InjectRepository(Gender)
      private readonly repository : Repository<Gender>) { }

  create(createGenderDto: CreateGenderDto) {
    const gender = this.repository.create(createGenderDto);
    return this.repository.save(gender);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateGenderDto: UpdateGenderDto) {
    const gender = await this.repository.findOneBy({ id });
    if(!gender) return null;
    this.repository.merge(gender, updateGenderDto);
    return this.repository.save(gender);
  }

  async remove(id: string) {
    const gender = await this.repository.findOneBy({ id });
    if(!gender) return null;
    return this.repository.remove(gender);
  }
}