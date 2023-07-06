import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { fromEventPattern } from 'rxjs';
import { CreateMovieDto } from './create-movie.dto';

//optional -> ?

//npm i @nestjs/mapped-types
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
