import { TestBed } from '@angular/core/testing';

import { FamilymemberService } from './familymember.service';

describe('FamilymemberService', () => {
  let service: FamilymemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilymemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
