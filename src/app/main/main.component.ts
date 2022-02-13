import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public menuOpened =true

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.menuOpened=!this.menuOpened
  }

}
