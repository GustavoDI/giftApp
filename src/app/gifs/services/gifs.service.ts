import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = 'ZDj0Vu2dRCTNls1lHva3klSkZI0naWL3';
  private _historial: string[]=[];

  // Cambiar any por su tipo
  public resultados: any[]= [];

  get historial(){
    
    return [...this._historial];
  }
  // con esto ya puedo realizar peticiones http como observables y los observablers
  // son mas poderoros que las promesas
    constructor (private http:HttpClient){
      
    }
  // Opcion 1 peticion json 
  buscarGifs (query:string){
    // aqui tambien se podria realiza una validacion de campo vacio.  
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
       this._historial.unshift(query);
       this._historial = this._historial.splice(0,10);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=ZDj0Vu2dRCTNls1lHva3klSkZI0naWL3&q=${query}&limit=10`)
    .subscribe((resp:any) => {
      console.log(resp.data);
      this.resultados = resp.data;
    });
    
    // fetch("https://api.giphy.com/v1/gifs/search?api_key=ZDj0Vu2dRCTNls1lHva3klSkZI0naWL3&q=dragon ball z&limit=10")
    // .then(resp =>{
    //   resp.json().then(data =>{
    //     console.log(data);
    //   });
    // });
    console.log(this._historial);
  }

// Opcion 2 
  async buscarGifs2 (query:string){
    // aqui tambien se podria realiza una validacion de campo vacio.  
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
       this._historial.unshift(query);
       this._historial = this._historial.splice(0,10);
    }
    const resp = await fetch("https://api.giphy.com/v1/gifs/search?api_key=ZDj0Vu2dRCTNls1lHva3klSkZI0naWL3&q=dragon ball z&limit=10");
    const data = await resp.json();
    console.log(data);
    
  }
}
