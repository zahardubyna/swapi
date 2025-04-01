import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetAccessToken = createParamDecorator<string | undefined>(
  (data: unknown, context: ExecutionContext): string | undefined => {
    const request: Request = context.switchToHttp().getRequest();

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  },
);
