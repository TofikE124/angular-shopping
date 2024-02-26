import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminAuthGuard } from './admin-auth.guard';

describe('adminAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AdminAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
