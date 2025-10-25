import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNewMessageDto {
  @ApiProperty({
    description:
      'The content of the message. Must be a non-empty string with a maximum length of 1500 characters.',
    maxLength: 1500,
    example: 'Hello, I would like to explore my career path.',
  })
  @MaxLength(1500)
  @IsNotEmpty()
  @IsString()
  content: string;
}
