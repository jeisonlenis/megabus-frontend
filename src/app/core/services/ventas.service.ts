import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Ventas } from '../models/ventas';
import { Tarjetas } from '../models/tarjetas';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}

  get refresh$() {
    return this._refresh$;
  }

  getVentas(): Observable<Ventas> {
    return this.http.get<Ventas>(`${environment.url}sells`);
  }

  getVentaById(id: string) {
    return this.http.get<Ventas>(`${environment.url}sells/${id}`);
  }

  getTarjetaById(id: string) {
    return this.http.get<Tarjetas>(`${environment.url}cards/${id}`);
  }

  updateVenta(venta: Ventas, id) {
    return this.http.put<Ventas>(`${environment.url}sells/${id}`, venta).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  updateInventario(id, inventario) {
    return this.http.put<Tarjetas>(
      `${environment.url}cards/inventario/${id}`,
      inventario
    );
  }

  saveVenta(usuario: Ventas) {
    return this.http.post<Ventas>(`${environment.url}sells`, usuario).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteVenta(id: string) {
    return this.http.delete<Ventas>(`${environment.url}sells/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
