import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ElectronService } from './services/electron.service';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { InputLayoutComponent } from './input-layout/input-layout.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    InputLayoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
