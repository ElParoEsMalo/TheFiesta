import { TestBed } from '@angular/core/testing';

import { UserDataStorageService } from './user-data-storage.service';

describe('UserDataStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDataStorageService = TestBed.get(UserDataStorageService);
    expect(service).toBeTruthy();
  });
});
