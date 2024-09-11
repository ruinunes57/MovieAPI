import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException} from '@nestjs/common';
import { GendersService } from './genders.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Post()
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.gendersService.create(createGenderDto);
  }

  @Get()
  findAll() {
    return this.gendersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const gender = await this.gendersService.findOne(id);
    if(!gender) throw new NotFoundException('Gender not found');
    return gender;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    const gender = await this.gendersService.update(id, updateGenderDto);
    if(!gender) throw new NotFoundException('Gender not found');
    return gender;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const gender = await this.gendersService.remove(id);
    if(!gender) throw new NotFoundException('Gender not found');
  }
}
