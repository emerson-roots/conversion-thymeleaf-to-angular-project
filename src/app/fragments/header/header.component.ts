import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * necessario dependencia @type/jquery
   * e declarar a var $
   */
  hideOrShowSidebar() {

    $(document).ready(function () {
      $(".navbar-toggle").click(function () {
        $(".sidebar").toggleClass("sidebar-open");
      })
    });

  }

}
