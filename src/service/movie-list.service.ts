import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  // private url = 'https://gist.githubusercontent.com/Urdzik/de477f8e3d7baf4366c9d797cfe63531/raw/38c6afa2937ef222323392cc34c8c8c77e02fc40/Movie.json';
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getMovieList(): Observable<any> {
    return this.http.get<any>(`${this.url}/movie`);
  }

  getMovieByYear(movieYear: string): Observable<any> {
    return this.http.get<any>(`${this.url}/year/${movieYear}`);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post(`${this.url}/addMovie`, movie);
  }

  delete(movieId: string): Observable<any> {
    return this.http.delete(`${this.url}/delete/${movieId}`);
  }

  updateData(movie: any): Observable<any> {
    return this.http.put(`${this.url}/update`, movie)
}
}
