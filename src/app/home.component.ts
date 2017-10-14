import { Component, OnInit} from '@angular/core';
import { SocketService } from './socket.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { INCREMENT, DECREMENT, RESET } from './ngrx/counter';
import { LOGIN, LOGOUT } from './ngrx/auth';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./app.component.css']
})
export class HomeComponent implements OnInit {
  sliderSrc : any
  rootPath = 'https://www.moxbet1.com/banner/'
  latestCoupon : any = {}
  constructor(private socketService: SocketService,private router: Router, private store: Store<any>) {
      
    };
ngOnInit() : void {
  //this.store.dispatch({ type: LOGOUT });
   this.getPress()
}
  getPress() : void {
    this.socketService
    .getLogin('homepage')
    .subscribe(data => {

      if (data.sliders) {
        //Object.values(data.sliders)
        //const ids : any[] = Object.keys(data.sliders)

        //eArr = eArr.concat(ids)
       //this.sliderSrc = Object.keys(data.sliders)
       this.sliderSrc = data.sliders
        //this.sliderSrc['keys'] = Object.keys(data.sliders)
        //this.sliderSrc['values'] = Object.values(data.sliders)
      }
      this.latestCoupon = data.latestCoupon
    })
  }
}
