import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoresComponent } from './autores.component';
import { AutorService } from '../autores.service';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Autor } from '../models/autores.model';

describe('AutoresComponent', () => {
  let component: AutoresComponent;
  let fixture: ComponentFixture<AutoresComponent>;
  let autorServiceSpy: jasmine.SpyObj<AutorService>;

  const mockAutores: Autor[] = [
    {
      id: '1',
      nome: 'Machado de Assis',
      nacionalidade: 'Brasileira',
      dataNascimento: '1839-06-21',
    },
    {
      id: '2',
      nome: 'J.K. Rowling',
      nacionalidade: 'Britânica',
      dataNascimento: '1965-07-31',
    },
    {
      id: '3',
      nome: 'George Orwell',
      nacionalidade: 'Britânica',
      dataNascimento: '1903-06-25',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AutorService', [
      'listarAutores',
      'excluir',
    ]);

    await TestBed.configureTestingModule({
      imports: [AutoresComponent],
      providers: [
        { provide: AutorService, useValue: spy },
        provideRouter([]),
      ],
    }).compileComponents();

    autorServiceSpy = TestBed.inject(
      AutorService
    ) as jasmine.SpyObj<AutorService>;

    autorServiceSpy.listarAutores.and.returnValue(of(mockAutores));

    fixture = TestBed.createComponent(AutoresComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de autores ao iniciar (ngOnInit)', () => {
    expect(autorServiceSpy.listarAutores).toHaveBeenCalled();
    expect(component.autores().length).toBe(3);
    expect(component.autores()[0].nome).toBe('Machado de Assis');
  });


  it('deve filtrar autores corretamente quando searchTerm mudar', () => {
    component.searchTerm.set('rowling');
    fixture.detectChanges();

    const filtrados = component.filteredAutores();
    expect(filtrados.length).toBe(1);
    expect(filtrados[0].nome).toBe('J.K. Rowling');
  });

  it('deve retornar lista vazia se a busca não encontrar nada', () => {
    component.searchTerm.set('xpto nao existe');
    fixture.detectChanges();
    expect(component.filteredAutores().length).toBe(0);
  });


  it('deve abrir o modal e setar o ID ao solicitar exclusão', () => {
    expect(component.deleteModalOpen()).toBeFalse();

    component.onDeleteRequest('1');

    expect(component.deleteModalOpen()).toBeTrue();
    expect(component.autorParaDeletar()).toBe('1');
  });

  it('deve chamar o serviço de excluir e atualizar a lista ao confirmar', () => {
    component.autores.set(mockAutores);
    component.autorParaDeletar.set('1');
    component.deleteModalOpen.set(true);

    autorServiceSpy.excluir.and.returnValue(of(void 0));

    component.onConfirmDelete();

    expect(autorServiceSpy.excluir).toHaveBeenCalledWith('1');

    expect(component.autores().length).toBe(2);
    expect(component.autores().find((a) => a.id === '1')).toBeUndefined();

    expect(component.deleteModalOpen()).toBeFalse();
    expect(component.autorParaDeletar()).toBeNull();
  });

  it('deve tratar erro ao excluir e fechar o modal', () => {
    spyOn(console, 'error');
    component.autorParaDeletar.set('1');

    autorServiceSpy.excluir.and.returnValue(
      throwError(() => ({ status: 400 }))
    );

    component.onConfirmDelete();

    expect(console.error).toHaveBeenCalled();
    expect(component.deleteModalOpen()).toBeFalse();
  });

  it('deve limpar os estados ao fechar o modal (closeModal)', () => {
    component.deleteModalOpen.set(true);
    component.autorParaDeletar.set('123');

    component.closeModal();

    expect(component.deleteModalOpen()).toBeFalse();
    expect(component.autorParaDeletar()).toBeNull();
  });
});
