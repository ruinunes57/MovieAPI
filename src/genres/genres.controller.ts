import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('genres')
@Controller('genders')  // Define this controller to handle requests related to "genders"
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  // Handle POST requests to create a new gender
  @Post()
  @ApiOperation({ summary: 'Create a new gender' })
  create(@Body() createGenderDto: CreateGenderDto) {
    // Pass the data to the service to create a new gender
    return this.genresService.create(createGenderDto);
  }

  // Handle GET requests to retrieve all genders
  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  findAll() {
    // Return the list of all genders from the service
    return this.genresService.findAll();
  }

  // Handle GET requests to retrieve a gender by its ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a gender by ID' })
  async findOne(@Param('id') id: string) {
    // Fetch the gender by ID from the service
    const gender = await this.genresService.findOne(id);

    // If the gender is not found, throw a NotFoundException
    if (!gender) throw new NotFoundException('Gender not found');

    return gender;
  }

  // Handle PATCH requests to update a gender by its ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a gender by ID' })
  async update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    // Update the gender and check if it exists
    const gender = await this.genresService.update(id, updateGenderDto);

    // If the gender is not found, throw a NotFoundException
    if (!gender) throw new NotFoundException('Gender not found');

    return gender;
  }

  // Handle DELETE requests to remove a gender by its ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gender by ID' })
  @HttpCode(204)  // Set the response code to 204 (No Content) on successful deletion
  async remove(@Param('id') id: string) {
    // Remove the gender by ID and check if it exists
    const gender = await this.genresService.remove(id);

    // If the gender is not found, throw a NotFoundException
    if (!gender) throw new NotFoundException('Gender not found');
  }
}
