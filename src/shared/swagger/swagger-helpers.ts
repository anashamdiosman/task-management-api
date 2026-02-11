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
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

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
}

/**
 * Maximal Swagger helper
 */
export function ApiStandardResponses<T>(
  successDto: ClassConstructor<T>,
  options: ApiHelperOptions = {},
) {
  const {
    status = 200,
    isArray = false,
    auth = false,
    summary,
    queryDto,
    param,
    extraModels,
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

  // Standard error responses
  decorators.push(ApiBadRequestResponse({ type: ErrorResponseDto }));
  decorators.push(ApiNotFoundResponse({ type: ErrorResponseDto }));

  return applyDecorators(...decorators);
}
