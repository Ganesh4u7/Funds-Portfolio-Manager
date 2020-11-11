import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCompareComponent } from './portfolio-compare.component';

describe('PortfolioCompareComponent', () => {
  let component: PortfolioCompareComponent;
  let fixture: ComponentFixture<PortfolioCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
