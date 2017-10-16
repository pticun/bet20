import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { INCREMENT, DECREMENT, RESET } from '../ngrx/counter';
import { LOGIN, LOGOUT } from '../ngrx/auth';
import { initialData } from '../ngrx/auth';
import * as _ from 'underscore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sliderSrc: any
  rootPath = 'https://www.moxbet1.com/banner/'
  latestCoupon: any = []
  un = _
  constructor(private socketService: SocketService, private router: Router, private store: Store<any>) {

  };
  ngOnInit(): void {
    //this.store.dispatch({ type: LOGOUT });
    this.getPress()
  }
  getPress(): void {
    this.sliderSrc = initialData.homepage.sliders
    this.latestCoupon = initialData.homepage.latestCoupon
    if (!initialData.homepage) {
      this.socketService
        .getLogin('homepage')
        .subscribe(data => {
          initialData.homepage = data
          if (data.sliders) {
            this.sliderSrc = data.sliders
          }
          this.latestCoupon = data.latestCoupon
        })
    }

  }
}
