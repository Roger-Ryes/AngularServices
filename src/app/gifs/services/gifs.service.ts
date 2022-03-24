import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string   = "JB1a3tQvLByLunPsaw1t49SDjXqCCzvH";
  private servicioUrl : string   = "http://api.giphy.com/v1/gifs";
  private _historial  : string[] = [];
  private limit       : number   = 10;
  public resultados   : Gif[]    = [];
  

  constructor(
    private http: HttpClient
  ) {
    console.log(localStorage.getItem('historial'));
    // Method1
    this._historial = (localStorage.getItem('historial'))?JSON.parse(localStorage.getItem('historial')!):[];
    // Method2
    this.resultados = JSON.parse(localStorage.getItem("result")!) || [];

   }
   
  get historial(){
    return [...this._historial];
  }

  buscarGrid( value: string ){
    value = value.toLowerCase();
    if(value!="" && !this._historial.includes(value)){
      this._historial.unshift(value);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
      console.log(this._historial);
    }
   
   
    // Forma larga: `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${value}&limit=${this.limit}`
    // Forma corta: `${this.servicioUrl}/search`, {params: parameters}
   
    const parameters = new HttpParams().set("api_key", this.apiKey).set("q", value).set("limit", this.limit);
    console.log("para: "+parameters);
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params: parameters})
    .subscribe( (resp:SearchGifsResponse)=>{ 
      this.resultados = resp.data;
      localStorage.setItem("result", JSON.stringify(this.resultados));
      // console.log(this.resultados);
    });
  }

}
