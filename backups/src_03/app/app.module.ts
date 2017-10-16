import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './ngrx/counter';
import { authReducer, getInitialState } from './ngrx/auth';
import { AuthGuard, AdmGuard } from './_guards/index'; 
//Modules
import { SocketService } from './socket.service';

//Components
import { AppComponent } from './app.component';
import { LiveComponent } from './live.component';
import { TournPartComponent } from './tournpart.component';
import { LoginComponent } from './login.component';
import { DerpPipe } from './derp.pipe';

import { LoginBarComponent } from "./parts/loginBar/loginBar.component";

import { SportsComponent } from './sports/sports.component';
import { HomeComponent } from './home/home.component';
import { CouponSidebarComponent } from './coupon-sidebar/coupon-sidebar.component';
//Components


//Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'live', component: LiveComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'my',
    canActivate: [AdmGuard],
    loadChildren: './myPanel/myPanel.module#MyPanelModule',
    data: {
      title: 'My Dashboard'
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

//https://github.com/bougarfaoui/ng-socket-io
const config : SocketIoConfig = { url: 'https://live.redsoftnv.com',
options: {}};



@NgModule({
  declarations: [
  AppComponent,
  LiveComponent,
  SportsComponent,
  TournPartComponent,
  LoginComponent,
  HomeComponent,
  DerpPipe,
  LoginBarComponent,
  CouponSidebarComponent
],
  imports: [
  BrowserModule,
  StoreModule.forRoot({ counter: counterReducer, auth : authReducer, ...{static: getInitialState}}),
  HttpModule,
  SocketIoModule.forRoot(config),
  RouterModule.forRoot(appRoutes, {useHash: true}),
  //RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  providers: [
    SocketService,
    AdmGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  demoModeule54455645 = 256
 }