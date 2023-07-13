import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from '@app/user/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserServie } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserServie) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    console.log('authMiddle', req.headers);
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[0];
    // console.log(token);

    try {
      const decode = verify(token, JWT_SECRET);
      const user = await this.userService.findById(decode.id);
      req.user = user;
      //   console.log('decode', decode);
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
