import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Tarjetas } from '../models/tarjetas';
import { Estaciones } from '../models/estaciones';
import { Vendedores } from '../models/vendedores';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getBusstations(): Observable<Estaciones> {
    return this.http.get<Estaciones>(`${environment.url}busstations`);
  }

  getSeller(id): Observable<Vendedores> {
    return this.http.get<Vendedores>(`${environment.url}sellers/${id}`);
  }

  getCard(id): Observable<Tarjetas> {
    return this.http.get<Tarjetas>(`${environment.url}cards/${id}`);
  }

  getBusstation(id): Observable<Estaciones> {
    return this.http.get<Estaciones>(`${environment.url}busstations/${id}`);
  }

  getCards(): Observable<Tarjetas> {
    return this.http.get<Tarjetas>(`${environment.url}cards`);
  }

  saveCard(tarjeta: Tarjetas) {
    console.log(tarjeta);

    return this.http.post<Tarjetas>(`${environment.url}cards`, tarjeta).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  updateCard(tarjeta: Tarjetas, id: string) {
    return this.http
      .put<Tarjetas>(`${environment.url}cards/${id}`, tarjeta)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
