import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPagosComponent } from './grid-pagos.component';

describe('GridPagosComponent', () => {
  let component: GridPagosComponent;
  let fixture: ComponentFixture<GridPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridPagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
