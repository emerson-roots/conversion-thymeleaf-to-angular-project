import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //metodo mostra as informações na tela Home de acordo com item clicado
  //criado para corrigir bug de link ancora que não estava funcionando inicialmente
  //com esta implementação, o evento perdeu propriedades como o FADE
  showInfo(id: string, event: Event) {

    //LIMPA TODAS AS SELEÇÕES
    document.querySelectorAll("div[role='tabpanel']").forEach(el => {
      el.setAttribute("class", "tab-pane fade")
    })

    //HABILITA ELEMENTO
    let el = document.getElementById(id)!
    el.setAttribute("class", "tab-pane fade show active")


    //LIMPA TODAS AS SELEÇÕES
    document.querySelectorAll("a[class*='list-group-item-action']").forEach(el => {
      el.setAttribute("class", "list-group-item list-group-item-action")
    })

    //AJUSTANDO MENU
    let item = event.target as Element;
    item.setAttribute("class", "list-group-item list-group-item-action active")

  }
}
