import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  /**
   * Intercepts the request and transforms the response data to plain objects.
   * @param {ExecutionContext} context - The execution context.
   * @param {CallHandler<any>} next - The call handler.
   * @returns {Observable<any>} An observable that emits the transformed data.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(map((data) => instanceToPlain(data)));
  }
}
