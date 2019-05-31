import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditNoteComponent } from './create-edit-note.component';

describe('CreateEditNoteComponent', () => {
  let component: CreateEditNoteComponent;
  let fixture: ComponentFixture<CreateEditNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
