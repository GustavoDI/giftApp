import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private ServUrl: string = 'https://api.giphy.com/v1/gifs'
  private apiKey : string = 'ZDj0Vu2dRCTNls1lHva3klSkZI0naWL3';
  private _historial: string[]=[];

  public resultados: Gif[]= [];

  get historial(){
    
    return [...this._historial];
  }
  // con esto ya puedo realizar peticiones http como observables y los observablers
  // son mas poderoros que las promesas
    constructor (private http:HttpClient){
      if (localStorage.getItem('historial')) {
        this._historial =JSON.parse(localStorage.getItem('historial')!) ||[];
        this.resultados =JSON.parse(localStorage.getItem('resultado')!) || [];
      }
    }
   
  buscarGifs (query:string){
    // aqui tambien se podria realiza una validacion de campo vacio.  
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
       this._historial.unshift(query);
       this._historial = this._historial.splice(0,10);

       localStorage.setItem('historial', JSON.stringify(this._historial));
       
    }

    const params = new HttpParams()
        .set('api_Key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.ServUrl}/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultados));
    });
    
    
    console.log(this._historial);
  }

}
