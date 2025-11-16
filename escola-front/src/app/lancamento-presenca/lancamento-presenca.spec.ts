import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoPresenca } from './lancamento-presenca';

describe('LancamentoPresenca', () => {
  let component: LancamentoPresenca;
  let fixture: ComponentFixture<LancamentoPresenca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoPresenca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoPresenca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
