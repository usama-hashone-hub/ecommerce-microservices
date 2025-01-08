import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    ServiceUnavailableException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { CircuitBreakerService } from './circuit-breaker.service';
  
  @Injectable()
  export class CircuitBreakerInterceptor implements NestInterceptor {

    private readonly circuitBreakerService: CircuitBreakerService

    constructor(
      private readonly serviceName: string,
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const breaker = this.circuitBreakerService.getBreaker(this.serviceName);
  
      if (breaker.isOpen()) {
        return throwError(
          () =>
            new ServiceUnavailableException(
              `${this.serviceName} is temporarily unavailable`,
            ),
        );
      }
  
      return next.handle().pipe(
        catchError((error) => {
          breaker.recordFailure();
          return throwError(() => error);
        }),
      );
    }
  }