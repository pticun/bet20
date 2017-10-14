import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { INCREMENT, DECREMENT, RESET } from './ngrx/counter';
import { Observable } from 'rxjs/Observable';
import { LOGIN, LOGOUT, initialData, initialState } from './ngrx/auth';
 // https://github.com/angular/angular/issues/9845 #router animation state
 // http://plnkr.co/edit/c41pebxqPQpKrJg6cHHq?p=preview

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  storeData: Observable<any>;
  currentUser : any = JSON.parse(localStorage.getItem('current_token'))

constructor(private router: Router, private store: Store<any>) {
 // this.storeData = store.select('auth');


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
}
  demoFunc() {}

  logout() {
    this.store.dispatch({ type: INCREMENT });
    this.store.dispatch({ type: LOGOUT });
    initialState.isLogin = 0
    this.router.navigate(['']);
  }

}
