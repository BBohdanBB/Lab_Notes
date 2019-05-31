import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { INote, NoteService } from '../note.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  private _disposed$ = new Subject<boolean>();

  @Input()
  public notes: INote[];

  @Input()
  public elemAdded$: Observable<INote>;

  @Input()
  public elemEdited$: Observable<INote>;

  @Input()
  public elemChanges$: Observable<INote>;

  @Output()
  public noteEditClicked = new EventEmitter<INote>();


  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.GetAll().subscribe(data => {
      this.notes = data;
    });

    this.elemAdded$.pipe(takeUntil(this._disposed$)).subscribe(elem => {
      this.notes.push(elem)
    });

    this.elemEdited$.pipe(takeUntil(this._disposed$)).subscribe(elem => {
      const note = this.notes.find(el =>  el.id == elem.id);
      note.text = elem.text;
      note.title = elem.title;
    });
  }

  public ngOnDestroy(): void {
    this._disposed$.next(true);
    this._disposed$.complete();
  }

  public delete(id: number){
    this.noteService.Delete(id).subscribe(_ => {
      this.notes = this.notes.filter(el => el.id != id);
    })
  }

  public edit(note: INote){
    this.noteEditClicked.emit(note);
  }
}
