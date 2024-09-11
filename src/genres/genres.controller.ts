import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Controller('genders')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genresService.create(createGenderDto);
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const gender = await this.genresService.findOne(id);
    if(!gender) throw new NotFoundException('Gender not found');
    return gender;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    const gender = await this.genresService.update(id, updateGenderDto);
    if(!gender) throw new NotFoundException('Gender not found');
    return gender;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const gender = await this.genresService.remove(id);
    if(!gender) throw new NotFoundException('Gender not found');
  }
}
