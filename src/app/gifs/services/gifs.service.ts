import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
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
        this._historial =JSON.parse(localStorage.getItem('historial')!);
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



    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=ZDj0Vu2dRCTNls1lHva3klSkZI0naWL3&q=${query}&limit=10`)
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
    });
    
    
    console.log(this._historial);
  }

}
