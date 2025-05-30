import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InversionsComponent } from './inversions.component';

describe('InversionsComponent', () => {
  let component: InversionsComponent;
  let fixture: ComponentFixture<InversionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InversionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InversionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
