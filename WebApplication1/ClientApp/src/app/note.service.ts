import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface INote {
  id: number,
  title: string,
  text: string
}

export interface ICreateNoteParams {
  title: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private _baseUrl: string = "/api/note";

  constructor(private httpClient: HttpClient) { }

  public GetAll() : Observable<INote[]> {
    return this.httpClient.get<INote[]>(this._baseUrl);
  }

  public GetById(id: number): Observable<INote> {
    return this.httpClient.get<INote>(`${this._baseUrl}/${id}`);
  }

  public Create(param: ICreateNoteParams): Observable<INote> {
    return this.httpClient.post<INote>(this._baseUrl, param);
  }

  public Update(id: number, param: ICreateNoteParams): Observable<INote> {
    return this.httpClient.put<INote>(`${this._baseUrl}/${id}`, param);
  }

  public Delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this._baseUrl}/${id}`);
  }
}
