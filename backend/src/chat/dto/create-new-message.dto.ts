import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNewMessageDto {
  @MaxLength(1500)
  @IsNotEmpty()
  @IsString()
  content: string;
}
