import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//import * as electron from 'electron';
// import { ipcRenderer, webFrame } from 'electron';
// import * as childProcess from 'child_process';
// import * as fs from 'fs';

//const electron = (<any>window).require('electron');



@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  // ipcRenderer!: typeof ipcRenderer;
  // webFrame!: typeof webFrame;
  // childProcess!: typeof childProcess;
  // fs!: typeof fs;
  config = new BehaviorSubject<any>([]);
  electron;


  constructor() {

    if (this.isElectron) {
      console.log('APP RUN BY ELECTRON')
      this.electron = (<any>window).require('electron');
      //   this.ipcRenderer = window.require('electron').ipcRenderer;
      //   this.webFrame = window.require('electron').webFrame;

      //   this.fs = window.require('fs');

      //   this.childProcess = window.require('child_process');
      //   this.childProcess.exec('node -v', (error, stdout, stderr) => {
      //     if (error) {
      //       console.error(`error: ${error.message}`);
      //       return;
      //     }
      //     if (stderr) {
      //       console.error(`stderr: ${stderr}`);
      //       return;
      //     }
      //     console.log(`stdout:\n${stdout}`);
      //   });

      this.electron.ipcRenderer.on('congig-data', (event:any, configData:any) => {
           console.log('angular - electron-service - event ==>',event)
           console.log('angular -electron-service - configData ==>',configData)
              this.config.next(configData);
            });

    } else {
      console.log('APP RUN BY ANGULAR')
    }
  }

  get isElectron(): boolean {
    return !!((<any>window) && (<any>window).process && (<any>window).process.type);
  }


  public get getDemoData(): string {
    return 'This is a demo data'
  }

  sendToMain(path: any) {
    //electron.ipcRenderer.send('sendToMain', path);
  }

  printToken(printData: any) {
    console.log('data ===> ', printData)
    if(!this.electron){
      console.log('Fail to send data to electron main-process as this app not run by electron')  
      return;
    }
    this.electron.ipcRenderer.send('process-print', printData);
  }


  fetchConfigFile() {
    if(!this.electron){
      console.log('Fail to send request to electron main-process as this app not run by electron')  
      return;
    }
    this.electron.ipcRenderer.send('ready-config-file');
  }

}
