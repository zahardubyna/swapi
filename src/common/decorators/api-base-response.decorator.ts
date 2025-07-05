import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

export const ApiBaseBadRequestResponse = () =>
  ApiBadRequestResponse({
    description: `${HttpStatus.BAD_REQUEST}. Bad Request`,
    schema: {
      type: 'object',
      example: {
        success: false,
        error: {
          code: HttpStatus.BAD_REQUEST,
          message:
            "The server can't process the request because there's something wrong with what you sent.",
        },
      },
    },
  });

export const ApiBaseUnauthorizedResponse = () =>
  ApiUnauthorizedResponse({
    description: `${HttpStatus.UNAUTHORIZED}. Unauthorized`,
    schema: {
      type: 'object',
      example: {
        success: false,
        error: {
          code: HttpStatus.UNAUTHORIZED,
          message:
            "The request failed because it didn't include the correct authentication for the resource.",
        },
      },
    },
  });

export const ApiBaseForbiddenResponse = () =>
  ApiForbiddenResponse({
    description: `${HttpStatus.FORBIDDEN}. Forbidden`,
    schema: {
      type: 'object',
      example: {
        success: false,
        error: {
          code: HttpStatus.FORBIDDEN,
          message:
            'An error occurred because the server denied access to the requested resource.',
        },
      },
    },
  });

export const ApiBaseNotFoundResponse = () =>
  ApiNotFoundResponse({
    description: `${HttpStatus.NOT_FOUND}. Not Found`,
    schema: {
      type: 'object',
      example: {
        success: false,
        error: {
          code: HttpStatus.NOT_FOUND,
          message: "The server couldn't find the requested resource.",
        },
      },
    },
  });

export const ApiBaseInternalServerErrorResponse = () =>
  ApiInternalServerErrorResponse({
    description: `${HttpStatus.INTERNAL_SERVER_ERROR}. Internal Server Error`,
    schema: {
      type: 'object',
      example: {
        success: false,
        error: {
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            'An internal server error occurred, preventing the server from fulfilling the request.',
        },
      },
    },
  });

export const ApiBaseResponses = () => {
  return applyDecorators(
    ApiBaseUnauthorizedResponse(),
    ApiBaseForbiddenResponse(),
    ApiBaseBadRequestResponse(),
    ApiBaseNotFoundResponse(),
    ApiBaseInternalServerErrorResponse(),
  );
};
