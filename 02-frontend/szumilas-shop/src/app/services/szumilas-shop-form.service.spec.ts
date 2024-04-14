import { TestBed } from '@angular/core/testing';

import { SzumilasShopFormService } from './szumilas-shop-form.service';

describe('SzumilasShopFormService', () => {
  let service: SzumilasShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzumilasShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
