import { Injectable } from '@angular/core';

const electron = (<any>window).require('electron');



@Injectable({
  providedIn: 'root'
})
export class ElectronService {


  constructor() {
    // this.ipcRender = electron.ipcRenderer;
  }





  public get getDemoData(): string {
    return 'This is a demo data'
  }

  sendToMain(path: any) {
    electron.ipcRenderer.send('sendToMain', path);
  }

}
