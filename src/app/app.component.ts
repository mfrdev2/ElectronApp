import { Component, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // https://dzone.com/articles/tutorial-use-angular-and-electron-to-create-a-desk
  title = 'electron-app';
  demoText = "";



  constructor(
    private _es:ElectronService,
    private router: Router
   
    ){

  }

  ngOnInit(): void {
      console.log(this._es.getDemoData)
     // this._es.sendToMain('I send some data to main process');
  }


}
