import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketService } from './socket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LOGIN, LOGOUT, initialData, initialState } from './ngrx/auth';
declare var window: any;
@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./app.component.css']
})
export class LoginComponent {

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>
	) {}

  getPress() {
    this.socketService
    .getLogin('casino')
    .subscribe(data => {
      console.log(data)
    })
  }

  loginPress() {
    const formData = {
      login : 'kafkadeveloper@gmail.com',
      password : '951753kdmox',
      remember : 'on'
    }

    this.socketService
    .postLogin('login', formData)
    .subscribe(data => {
      if (data.api_token) {
        localStorage.setItem('user_info', JSON.stringify(data));
        localStorage.setItem('current_token', JSON.stringify(data.api_token));
        initialState.isLogin = 1
        this.store.dispatch({ type: LOGIN });
        this.router.navigate(['my']);
      }

      // console.log(data)
    })
  }

}
