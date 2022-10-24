import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

export class MyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          error: null,
        };
      }),
      catchError((error) => {
        return of({
          data: null,
          error: error.message,
        });
      }),
    );
  }
}
