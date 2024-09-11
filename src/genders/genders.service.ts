import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import {Repository} from "typeorm";
import {Gender} from "./entities/gender.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class GendersService {
  constructor(
      @InjectRepository(Gender)
      private readonly repository : Repository<Gender>) { }

  create(createGenderDto: CreateGenderDto) {
    const gender = this.repository.create(createGenderDto);
    return this.repository.save(gender);
  }

  findAll() {
    return `This action returns all genders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gender`;
  }

  update(id: number, updateGenderDto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: number) {
    return `This action removes a #${id} gender`;
  }
}
