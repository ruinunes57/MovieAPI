import { IsString } from "class-validator";

export class CreateGenderDto {
    // Validate that the name is a string
    @IsString()
    name: string;
}
