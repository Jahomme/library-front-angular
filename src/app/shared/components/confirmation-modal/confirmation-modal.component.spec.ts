import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { By } from '@angular/platform-browser';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('title', 'Título de Teste');
    fixture.componentRef.setInput('message', 'Mensagem de Teste');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o título e a mensagem corretamente', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const tituloElemento = compiled.querySelector('h3');
    const mensagemElemento = compiled.querySelector('p');

    expect(tituloElemento?.textContent).toContain('Título de Teste');
    expect(mensagemElemento?.textContent).toContain('Mensagem de Teste');
  });

  it('deve emitir o evento "confirm" ao clicar no botão de confirmação', () => {
    spyOn(component.confirm, 'emit');

    const botaoConfirmar = fixture.debugElement.query(By.css('.btn-confirm'));

    expect(botaoConfirmar).toBeTruthy(
      'Botão confirmar não foi encontrado no HTML'
    );

    botaoConfirmar.nativeElement.click();

    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('deve emitir o evento "cancel" ao clicar no botão de cancelar', () => {
    spyOn(component.cancel, 'emit');

    const botaoCancelar = fixture.debugElement.query(By.css('.btn-cancel'));

    expect(botaoCancelar).toBeTruthy(
      'Botão cancelar não foi encontrado no HTML'
    );

    botaoCancelar.nativeElement.click();

    expect(component.cancel.emit).toHaveBeenCalled();
  });
});
