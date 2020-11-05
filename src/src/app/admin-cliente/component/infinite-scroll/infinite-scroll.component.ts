import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})

export class InfiniteScrollComponent implements OnInit {
 
  public linesToWrite: Array<string>;

  private finishPage = 5; //numero maximo de paginas
  private actualPage: number; //iteracion o pagina en la que nos encontramos

  public showGoUpButton: boolean;//Determina si se debe mostrar o no el boton para volver arriba


  showScrollHeight = 10;
  hideScrollHeight = 200;


  constructor() {
      this.actualPage = 1; //Setea la pagina actual en 1
      this.showGoUpButton = false;
    }


  /**
   * llama al metodo de añadir 40 lineas solo si estamos dentro del intervalo establecido
   * actual page < this.finish page
   * */ 
  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.add40lines();
      this.actualPage ++;
    } else {
      console.log('No more lines. Finish page!');
    }
  }

/**
 * Nos devuelve al inicio de la lista
 */
scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }
 
  ngOnInit() {
    this.linesToWrite = new Array<string>();
    this.add40lines();
  }
 
  add40lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 40; i ++) {
      this.linesToWrite.push(line + lineCounter);
      lineCounter ++;
    }
  }
}

