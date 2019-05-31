import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NoteService, ICreateNoteParams, INote } from '../note.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'create-edit-note',
  templateUrl: './create-edit-note.component.html',
  styleUrls: ['./create-edit-note.component.css']
})
export class CreateEditNoteComponent implements OnInit, OnDestroy {
  private _editMode: 'edit' | 'create' = 'create';
  private _noteId: number;
  private _disposed$ = new Subject<boolean>();

  @Output()
  public noteCreated = new EventEmitter<INote>();

  @Output()
  public noteEdited = new EventEmitter<INote>();

  @Input()
  public setEditNote$: Observable<INote>;

  @Input()
  public setCreateNote$: Observable<void>;

  public model: ICreateNoteParams = {title: "", text: ""};
  
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.setEditNote$.pipe(takeUntil(this._disposed$)).subscribe(note => {
      this._noteId = note.id;
      this.model.text = note.text;
      this.model.title = note.title;
      this._editMode = "edit";
    });

    this.setCreateNote$.pipe(takeUntil(this._disposed$)).subscribe(_ => {
      this._editMode = "create";
      this.model = {title: "", text: ""};
    })
  }

  public ngOnDestroy(): void {
    this._disposed$.next(true);
    this._disposed$.complete();
  }

  public SaveNote() {
    switch (this._editMode) {
      case 'edit':
          this.noteService.Update(this._noteId, this.model).subscribe(note => {
            this.noteEdited.emit(note);
          })
      break;
      case 'create':
        this.noteService.Create(this.model).subscribe(note => {
          this.noteCreated.emit(note);
        });
      break;
    }
  }
}
