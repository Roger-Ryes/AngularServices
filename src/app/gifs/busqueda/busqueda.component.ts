import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  //Busca el elemento HTML o lo mismo a document.querySelector('')
  @ViewChild("txtBuscar") txtBuscar!: ElementRef<HTMLInputElement>;

  // buscar(data: any){ // metodo1
  buscar(){ // metodo2
    const value = this.txtBuscar.nativeElement.value;
    console.log(value);
    this.txtBuscar.nativeElement.value="";
    this.gifsService.buscarGrid(value);
  }

  constructor( private gifsService: GifsService ){}

}
