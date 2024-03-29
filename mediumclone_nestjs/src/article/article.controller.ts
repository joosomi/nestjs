import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ArticleService } from '@app/article/article.service';
import { CreateArticleDto } from '@app/article/dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  //Feed Articles
  //GET /api/articles/feed
  @Get('feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getFeed(currentUserId, query);
  }

  //GET - findAll
  @Get()
  async findAll(
    @User('id') cuurentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(cuurentUserId, query);
  }

  //POST
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }

  //Get Article /api/articles/:slug
  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

  //DELETE /api/articles/:slug
  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  //Update Article
  //PUT /api/articles/:slug
  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe()) //custom ValidationPipe
  async updateArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ) {
    const article = await this.articleService.updateArticle(
      slug,
      updateArticleDto,
      currentUserId,
    );
    return await this.articleService.buildArticleResponse(article);
  }

  //Favorite Article
  //POST /api/articles/:slug/favorite
  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }

  //Unfavorite Article
  //DELETE /api/articles/:slug/favorite
  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId,
    );

    return this.articleService.buildArticleResponse(article);
  }
}
