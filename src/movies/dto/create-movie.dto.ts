import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateMovieDto {
    // Ensure that the title is a non-empty string
    @IsString()
    @IsNotEmpty()
    title: string;

    // Ensure that the description is a non-empty string
    @IsString()
    @IsNotEmpty()
    description: string;

    // Transform the input into a Date object and validate that it is a valid date
    @Type(() => Date)
    @IsDate()
    releaseDate: Date;

    // Validate that genres is an array of non-empty strings
    @IsArray()
    @ArrayNotEmpty()  // Ensure that the array is not empty
    @IsString({ each: true })  // Ensure that each element in the array is a string
    genres: string[];
}
