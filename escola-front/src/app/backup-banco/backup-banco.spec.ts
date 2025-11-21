import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupBancoComponent } from './backup-banco';

describe('BackupBanco', () => {
  let component: BackupBancoComponent;
  let fixture: ComponentFixture<BackupBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupBancoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackupBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
