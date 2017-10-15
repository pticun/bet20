import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPanelComponent } from './myPanel.component';
import { AccountHomeComponent } from './accountHome/accountHome.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';

//Routes
const appRoutes: Routes = [
  { 
  path: '', 
  component: MyPanelComponent,
  children: [
    {
      path: '',
      component: AccountHomeComponent,
      data: {
        title: 'Home '
      }
    },
    {
      path: 'account',
      component: AccountHomeComponent,
      data: {
        title: 'Edit'
      }
    },
    {
      path: 'tickets',
      component: TicketsComponent,
      data: {
        title: 'Tickets'
      }
    }
  ]}
];


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [
    MyPanelComponent,
    AccountHomeComponent,
    TicketsComponent
]
})
export class MyPanelModule { }