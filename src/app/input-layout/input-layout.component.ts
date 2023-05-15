import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input-layout',
  templateUrl: './input-layout.component.html',
  styleUrls: ['./input-layout.component.css']
})
export class InputLayoutComponent implements OnInit {

  inputBean: any

  isError:Boolean = false;
  errorText:any 

 

  constructor(
    private router: Router
    ,private _network:NetworkService) {

  }


  ngOnInit() {
    this.inputBean = {
      applicationId: '',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null
    };

    this.updateDisplay()

    this.handleNumberClick()



  }


  updateDisplay() {
    const display: any = document.querySelector('.screen-input');
    display.value = this.inputBean.applicationId;
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
    const { applicationId, waitingForSecondOperand } = this.inputBean;

    this.inputBean.applicationId =
    applicationId === '' ? digit : applicationId + digit;
  
  }

   clearLastDigit() {
   const { applicationNumber, waitingForSecondOperand } = this.inputBean;
   if(!applicationNumber){
       return;
   }
   this.inputBean.applicationNumber = applicationNumber.slice(0, -1);;
   this.inputBean.firstOperand = null;
   this.inputBean.waitingForSecondOperand = false;
   this.inputBean.operator = null;
  }


  clickOnNext(ev:any){
    this.errorMsg()
   var applicationId = this.inputBean.applicationId;
    console.log("click===> next",applicationId)

    if(!applicationId){
      console.log('application number not found')
      return;
    }

   var otpData = this._network.sendOTPRequest(applicationId)


   console.log('otp===> ',otpData)

   this._network.seveDataOnLocal(otpData)

   //this.router.navigate(['/otp']);

  }

   errorMsg() {
    this.isError = true;
    this.errorText = `এই আবেদনটির (${this.inputBean.applicationId}) শুনানি দিন এখনো ধার্য করা হয় নাই।`;
  }


}
