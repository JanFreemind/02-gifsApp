import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'v1xDI9I1D9qtWoCOXLm3cvBvkxYwIvwo';

  private _historial: string[] = [];

  // TODO: Cambiar any por su tipo 
  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

  }

  buscarGifs( query: string ){

    query = query.trim().toLocaleLowerCase();

    if( ! this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=v1xDI9I1D9qtWoCOXLm3cvBvkxYwIvwo&q=${ query }&limit=10`)
      .subscribe( ( resp: any ) => {
        console.log( resp.data );
        this.resultados = resp.data;
      });

  }

}
