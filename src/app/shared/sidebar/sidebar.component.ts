
import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent  {

  // En este punto estamos injectando el servicio.
  constructor(private gifsServicio: GifsService) { }

  get historial(){
    return this.gifsServicio.historial;
  }
  
  buscar(termino:string){
    console.log(termino);
    this.gifsServicio.buscarGifs(termino);
  }
}
