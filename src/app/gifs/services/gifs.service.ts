import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'm8ExTZNFs920qpYq95OjAssEbZNbdU86';
  private _tagHistory: string[] = [];
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLoacalStorage();
  }

  get tagHistory(): string[] {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLoacalStorage(): void {
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagHistory.length === 0) return;

    this.searchTags(this._tagHistory[0]);
  }

  searchTags(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
      });
  }
}
