import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authState, initialState } from '../ngrx/auth';
import { Store } from '@ngrx/store';
@Injectable()
export class AdmGuard implements CanActivate {
isAuth : number = authState
    constructor(private router: Router, private store: Store<any>) {
        this.store.select(state => state.auth).subscribe(auth => {
            this.isAuth = auth
              //console.log(this.storeData)
            })
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('current_token')  && initialState.isLogin) {
            let currentUserJson: any = localStorage.getItem('current_token');
            var currentUserParse = JSON.parse(currentUserJson);
                return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}