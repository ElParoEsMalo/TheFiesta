import { TestBed, async, inject } from '@angular/core/testing';

import { GuardPageGuard } from './guard-page.guard';

describe('GuardPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardPageGuard]
    });
  });

  it('should ...', inject([GuardPageGuard], (guard: GuardPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
