import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { LOGIN, LOGOUT, initialData } from '../ngrx/auth';



@Component({
  selector: 'app-myPanel',
  templateUrl: './myPanel.component.html',
  styleUrls: ['./myPanel.component.css']
})
export class MyPanelComponent implements OnInit {
  sidebarData : any = sidebarData
  constructor(private router: Router, private store: Store<any>) {
    

    };

  ngOnInit() {}

}

//SIDEBAR DATA
export const sidebarData = {
  account : [
  {
  name : 'account',
  title: 'Üyelik Bilgilerim',
  icon : 'icon-user'
},
{
  name : 'tickets',
  title: 'Mesajlarım',
  icon : 'icon-user'
},
{
  name : 'documents',
  title: 'Belgelerim',
  icon : 'icon-user'
},
{
  name : 'security',
  title: 'Şifre & Güvenlik',
  icon : 'icon-user'
},
{
  name : 'bank',
  title: 'Banka Hesabım',
  icon : 'icon-user'
}],
logs : [
  {
    name : 'coupons',
    title: 'Kuponlarım',
    icon : 'icon-user'
  },
  {
    name : 'bonus',
    title: 'Bonuslarım',
    icon : 'icon-user'
  },
  {
    name : 'logs',
    title: 'Geçmişim',
    icon : 'icon-user'
  }
],
finance : [
  {
    name : 'payment',
    title: 'Para Yatır',
    icon : 'icon-user'
  },
  {
    name : 'payment',
    title: 'Para Çek',
    icon : 'icon-user'
  }
]
}