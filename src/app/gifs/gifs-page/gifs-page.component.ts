import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-gifs-page',
  templateUrl: './gifs-page.component.html'
})
export class GifsPageComponent implements OnInit {

  constructor(private gitsServices: GifsService) { }

  ngOnInit(): void {
    if(this.gitsServices.historial.length==0){
      this.gitsServices.buscarGrid("Bienvenido");
    }
  }

}
