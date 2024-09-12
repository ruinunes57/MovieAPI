import { IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateGenderDto {
    // Validate that the name is a string
    @ApiProperty({ description: 'Name of the gender' })
    @IsString()
    name: string;
}
