import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { INCREMENT, DECREMENT, RESET } from './ngrx/counter';
import { LOGIN, LOGOUT, initialData, initialState } from './ngrx/auth';
 // https://github.com/angular/angular/issues/9845 #router animation state
 // http://plnkr.co/edit/c41pebxqPQpKrJg6cHHq?p=preview
 declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
  storeData: any;
  currentUser : any = JSON.parse(localStorage.getItem('current_token'))

constructor(private router: Router, private store: Store<any>) {
 // this.storeData = store.select('auth');
 this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    window.$("html, body").animate({ scrollTop: "0" }, 500);
  }
});


};

ngOnInit() {
  this.store.select(state => state).subscribe(data => {
    this.storeData = data
      //console.log(this.storeData)
    })

    /*this.store.select('static').subscribe(data => {
      this.storeData = data
        //console.log(this.storeData)
      })*/
      window.$(document).ready(function () {
        //attaching the event listener
        window.$(window).on('hashchange', function () {
            //do something
        });
    
        //manually tiggering it if we have hash part in URL
        if (window.location.hash) {
            window.$(window).trigger('hashchange')
        }
    });
}
  demoFunc() {}

  logout() {
    this.store.dispatch({ type: INCREMENT });
    this.store.dispatch({ type: LOGOUT });
    initialState.isLogin = 0
    this.router.navigate(['']);
  }

}
