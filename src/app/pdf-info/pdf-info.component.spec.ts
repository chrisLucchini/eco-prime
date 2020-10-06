import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfInfoComponent } from './pdf-info.component';

describe('PdfInfoComponent', () => {
  let component: PdfInfoComponent;
  let fixture: ComponentFixture<PdfInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
