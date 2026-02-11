// src/shared/swagger/swagger-helpers.ts
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiExtraModels,
  ApiParam,
  ApiConflictResponse,
} from '@nestjs/swagger';

/**
 * Type-safe class constructor
 */
export type ClassConstructor<T> = {
  new (...args: any[]): T;
};

/**
 * Options for Swagger decorator helper
 */
export interface ApiHelperOptions {
  status?: number; // HTTP status for success (default 200)
  isArray?: boolean; // If the response is an array
  auth?: boolean; // Add bearer auth
  summary?: string; // Operation summary
  queryDto?: Type<any>; // DTO for query parameters
  param?: { name: string; type: Type<any>; description?: string }; // Single path param
  extraModels?: Type<any>[]; // Nested DTOs for Swagger
  actionType: 'all' | 'create' | 'read' | 'update' | 'delete' | 'login'; // Added 'login' for 401
}

/**
 * Maximal Swagger helper with dynamic error examples
 */
export function ApiStandardResponses<T>(
  successDto: ClassConstructor<T>,
  options: ApiHelperOptions = { actionType: 'read' },
) {
  const {
    status = 200,
    isArray = false,
    auth = false,
    summary,
    queryDto,
    param,
    extraModels,
    actionType,
  } = options;

  const decorators: MethodDecorator[] = [];

  // Summary
  if (summary) decorators.push(ApiOperation({ summary }));

  // Auth
  if (auth) decorators.push(ApiBearerAuth());

  // Extra models
  if (extraModels && extraModels.length > 0) {
    decorators.push(ApiExtraModels(...extraModels));
  }

  // Query DTO
  if (queryDto) {
    decorators.push(ApiQuery({ type: queryDto, required: false }));
  }

  // Single path param
  if (param) {
    decorators.push(
      ApiParam({
        name: param.name,
        type: param.type,
        description: param.description,
      }),
    );
  }

  // Success response
  if (status === 200) {
    decorators.push(ApiOkResponse({ type: successDto, isArray }));
  } else {
    decorators.push(ApiResponse({ status, type: successDto, isArray }));
  }

  // Conflict errors for create/update/all
  if (['create', 'update', 'all'].includes(actionType)) {
    decorators.push(
      ApiConflictResponse({
        description: 'Conflict occurred',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 409 },
            message: { type: 'string', example: 'Conflict occurred' },
            error: { type: 'string', example: 'Conflict' },
          },
          example: {
            statusCode: 409,
            message: 'Conflict occurred',
            error: 'Conflict',
          },
        },
      }),
    );
  }

  // NotFound errors for read/delete/all
  if (['read', 'delete', 'all'].includes(actionType)) {
    decorators.push(
      ApiNotFoundResponse({
        description: 'Resource not found',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 404 },
            message: { type: 'string', example: 'Resource not found' },
            error: { type: 'string', example: 'Not Found' },
          },
          example: {
            statusCode: 404,
            message: 'Resource not found',
            error: 'Not Found',
          },
        },
      }),
    );
  }

  // BadRequest is always included
  decorators.push(
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Bad Request' },
          error: { type: 'string', example: 'Bad Request' },
        },
        example: {
          statusCode: 400,
          message: 'Bad Request',
          error: 'Bad Request',
        },
      },
    }),
  );

  // 401 Unauthorized for login actionType
  if (actionType === 'login' || auth) {
    decorators.push(
      ApiResponse({
        status: 401,
        description: 'Unauthorized',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Invalid credentials' },
            error: { type: 'string', example: 'Unauthorized' },
          },
          example: {
            statusCode: 401,
            message: 'Invalid credentials',
            error: 'Unauthorized',
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
