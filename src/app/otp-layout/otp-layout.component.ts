import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-otp-layout',
  templateUrl: './otp-layout.component.html',
  styleUrls: ['./otp-layout.component.css']
})
export class OtpLayoutComponent implements OnInit {

  inputBean: any

  constructor(
    private router: Router,
    private _location: Location,
    private _network:NetworkService,
    private _electron:ElectronService
    ) {

  }


  ngOnInit() {
    this.inputBean = {
      otpData: '',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null
    };

    this.updateDisplay()

    this.handleNumberClick()


  }


  updateDisplay() {
    const display: any = document.querySelector('.screen-input');
    display.value = this.inputBean.otpData;
  }


  handleNumberClick(){
    const keys: any = document.querySelector('.btn-digit');
    keys.addEventListener('click', (event: { target: any; }) => {
      const target = event.target;
      console.log('button click ==>', target)
      if (target.classList.contains('clear')) {
        console.log('button click == clear')
        this.clearLastDigit();
        this.updateDisplay();
        return;
      }

      if(!target.value){
        return;
      }

      this.inputDigit(target.value);
      this.updateDisplay();
      return;
    });
  }


  inputDigit(digit:any) {
    const { otpData, waitingForSecondOperand } = this.inputBean;

    this.inputBean.otpData =
    otpData === '' ? digit : otpData + digit;
  
  }

   clearLastDigit() {
   const { otpData, waitingForSecondOperand } = this.inputBean;
   if(!otpData){
       return;
   }
   this.inputBean.otpData = otpData.slice(0, -1);;
   this.inputBean.firstOperand = null;
   this.inputBean.waitingForSecondOperand = false;
   this.inputBean.operator = null;
  }


  clickOnNext(){
   var otp = this.inputBean.otpData;
    console.log("click===> next",otp)
    if(!otp){
      console.log('application number not found')
      return;
    }

   var data = this._network.getDataFromLocal();

   if(data.otp != otp){
     console.log('otp mismatch')
     return;
   }

   const printData = {
    applicationId:21545415,
    phoneNo:'01775123605',
    applicationDate:'14-05-2023'
   }
   
    this._electron.sendToMainForPrintData(printData);

  }

  goPreviousPage(){
    this._location.back();
  }
}
