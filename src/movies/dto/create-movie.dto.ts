import {ArrayNotEmpty, IsArray, IsDate, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateMovieDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @Type(() => Date)
    @IsDate()
    releaseDate: Date;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    genres: string[];
}
