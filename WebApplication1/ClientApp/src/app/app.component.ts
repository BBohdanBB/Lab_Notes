import { Component, OnInit } from '@angular/core';
import { INote, NoteService } from './note.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public elemAdded$ = new Subject<INote>();
  public elemEdited$ = new Subject<INote>();
  public setEditNote$ = new Subject<INote>();
  public setCreateNote$ = new Subject();

  constructor() { }

  public createNote() {
    this.setCreateNote$.next();
  }

  public onNoteCreated(note: INote) {
    this.elemAdded$.next(note);
  }

  public onNoteEdited(note: INote) {
    this.elemEdited$.next(note);
  }

  public onNoteEditClicked(note: INote) {
    this.setEditNote$.next(note);
  }
}
