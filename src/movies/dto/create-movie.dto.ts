import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMovieDto {
    // Ensure that the title is a non-empty string
    @ApiProperty({ description: 'The title of the movie' })
    @IsString()
    @IsNotEmpty()
    title: string;

    // Ensure that the description is a non-empty string
    @ApiProperty({ description: 'The description of the movie' })
    @IsString()
    @IsNotEmpty()
    description: string;

    // Transform the input into a Date object and validate that it is a valid date
    @ApiProperty({ description: 'The release date of the movie', example: '2023-09-10' })
    @Type(() => Date)
    @IsDate()
    releaseDate: Date;

    // Validate that genres is an array of non-empty strings
    @ApiProperty({ description: 'List of genres associated with the movie', type: [String] })
    @IsArray()
    @ArrayNotEmpty()  // Ensure that the array is not empty
    @IsString({ each: true })  // Ensure that each element in the array is a string
    genres: string[];
}
