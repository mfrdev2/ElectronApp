import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ElectronService } from './services/electron.service';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { InputLayoutComponent } from './input-layout/input-layout.component';
import { FooterComponent } from './footer/footer.component';
import { OtpLayoutComponent } from './otp-layout/otp-layout.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    InputLayoutComponent,
    FooterComponent,
    OtpLayoutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: InputLayoutComponent },
      { path: 'otp', component: OtpLayoutComponent }
    ])
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
