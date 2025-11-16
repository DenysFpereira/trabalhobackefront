import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoLogin } from './aluno-login';

describe('AlunoLogin', () => {
  let component: AlunoLogin;
  let fixture: ComponentFixture<AlunoLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlunoLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunoLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
