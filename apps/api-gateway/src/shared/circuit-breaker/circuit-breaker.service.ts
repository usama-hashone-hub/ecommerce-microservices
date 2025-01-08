import { Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus'; 
import { CircuitBreaker, CircuitBreakerOptions } from 'opossum';

@Injectable()
export class CircuitBreakerService {
  private readonly breakers: Map<string, CircuitBreaker> = new Map();

  constructor(private health: HealthCheckService) {}

  getBreaker(serviceName: string): CircuitBreaker {
    if (!this.breakers.has(serviceName)) {
      const options: CircuitBreakerOptions = {
        failureThreshold: 5, // Number of failures before opening the circuit
        successThreshold: 2, // Number of successes before closing the circuit
        timeout: 10000, // Time in milliseconds before attempting to close the circuit
      };

      this.breakers.set(
        serviceName,
        new CircuitBreaker(options),
      );
    }

    return this.breakers.get(serviceName);
  }
}