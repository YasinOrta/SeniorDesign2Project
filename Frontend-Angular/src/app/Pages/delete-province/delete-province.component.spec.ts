import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProvinceComponent } from './delete-province.component';

describe('DeleteProvinceComponent', () => {
  let component: DeleteProvinceComponent;
  let fixture: ComponentFixture<DeleteProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProvinceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
