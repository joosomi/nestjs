import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Body,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

//express - 라우터 같은 존재
//movies가 라우터가 된다.
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  //nest.js는 express, fastify 위에서 작동, req와 res를 많이 사용안하는 것이 좋다.
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //   @Get('search')
  //   search(@Query('year') searchingYear: string) {
  //     return `We are searching for a movie made after ${searchingYear}`;
  //   }

  //무언가를 원한다면 요청해야 한다.
  //id 2개는 이름이 같아야 하지만 뒤에는 달라도 된다.
  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    console.log(typeof movieId);
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    //console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  //update
  // put - whole resource
  //patch - 일부분만
  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
