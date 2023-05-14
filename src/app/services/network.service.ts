import { Injectable } from '@angular/core';
import { APPLICATION_ID_KEY, MOBILE_NUMBER_KEY, OTP_KEY } from '../utils/Constraint';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  

  constructor() { }

  sendOTPRequest(applicationId:any){
      return {
        applicationId:applicationId,
        otp:1234,
        mobileNo:'01775236027'
      };
  }

  seveDataOnLocal(data:any){
    localStorage.setItem(APPLICATION_ID_KEY,data.applicationId)
    localStorage.setItem(OTP_KEY,data.otp)
    localStorage.setItem(MOBILE_NUMBER_KEY,data.mobileNo)
  }

  getDataFromLocal(){
    return {
        applicationId:localStorage.getItem(APPLICATION_ID_KEY),
        otp:localStorage.getItem(OTP_KEY),
        mobileNo:localStorage.getItem(MOBILE_NUMBER_KEY)
      }
 
  }

}
