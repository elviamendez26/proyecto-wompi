/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FintraBuscadoService } from './fintraBuscado.service';

describe('Service: FintraBuscado', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FintraBuscadoService]
    });
  });

  it('should ...', inject([FintraBuscadoService], (service: FintraBuscadoService) => {
    expect(service).toBeTruthy();
  }));
});
