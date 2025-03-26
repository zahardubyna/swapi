import {
  ApiBadRequestResponse, ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';
import objectContaining = jasmine.objectContaining;

export const ApiBaseBadRequestResponse = () =>
  ApiBadRequestResponse({
  description: `${HttpStatus.BAD_REQUEST}. Bad Request`,
  schema: {
    type: 'object',
    example: {
      code: 400,
      error: 'Bad Request',
      message: 'The server can\'t process the request because there\'s something wrong with what you sent.'
    }
  },
});

export const ApiBaseUnauthorizedResponse = () =>
  ApiUnauthorizedResponse({
    description: `${HttpStatus.UNAUTHORIZED}. Unauthorized`,
    schema: {
      type: 'object',
      example: {
        code: 401,
        error: 'Unauthorized',
        message: 'The request failed because it didn\'t include the correct authentication for the resource.'
      }
    },
  });

export const ApiBaseForbiddenResponse = () =>
  ApiForbiddenResponse({
    description: `${HttpStatus.FORBIDDEN}. Forbidden`,
    schema: {
      type: 'object',
      example: {
        code: 403,
        error: 'Forbidden',
        message: 'An error occurred because the server denied access to the requested resource.'
      }
    },
  });

export const ApiBaseNotFoundResponse = () =>
  ApiNotFoundResponse({
    description: `${HttpStatus.NOT_FOUND}. Not Found`,
    schema: {
      type: 'object',
      example: {
        code: 404,
        error: 'Not Found',
        message: 'The server couldn\'t find the requested resource.'
      }
    }
  });

export const ApiBaseInternalServerErrorResponse = () =>
   ApiInternalServerErrorResponse({
    description: `${HttpStatus.INTERNAL_SERVER_ERROR}. Internal Server Error`,
    schema: {
      type: 'object',
      example: {
        code: 500,
        error: 'Internal Server Error',
        message: 'An internal server error occurred, preventing the server from fulfilling the request.'
      }
    }
  });

export const ApiBaseResponse = () => {
  return applyDecorators(
    ApiBaseBadRequestResponse,
    ApiBaseUnauthorizedResponse,
    ApiBaseForbiddenResponse,
    ApiBaseNotFoundResponse,
    ApiBaseInternalServerErrorResponse
  );
};
