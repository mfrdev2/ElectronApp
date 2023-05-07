import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'electron-app';
  constructor(private es: ElectronService){}

  ngOnInit(): void {
    console.log('HomeComponent INIT',this.es.isElectron);
  }
}
