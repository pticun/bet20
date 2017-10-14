import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable'
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
declare var window: any;
// const DATA_URL = 'ws://apex.redsoftnv.com/api/live/?active=1&status=started';
const SOCKET_URL = 'https://live.redsoftnv.com';
const FIRST_DATA_URL = 'https://apex.redsoftnv.com/api/live/?active=1&status=started';
const FIRST_DATA_URL2 = 'http://fakebackend.dev/first';
const TOTAL_DATA_URL = 'http://apex.redsoftnv.com/api/prematch/?hours=168';
const TOTAL_DATA_URL_NEW = 'http://adsdemo.dev/api/redsoft/category';
const SINGLE_DATA_URL = 'https://apex.redsoftnv.com/api/live/?details=';
const BASE_API = 'https://betdemo.dev/rest/v1/';
const ROOT_API = 'https://betdemo.dev/';





//https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

@Injectable()
export class SocketService {
  liste : any
  OUT_API = 'https://www.moxbet1.com/rest/v1/';
  proxyurl = 'https://cors-anywhere.herokuapp.com/';
  constructor(private http: Http, private socket: Socket) {
    if (window.location.hostname == 'www.moxbet1.com') {
      this.OUT_API = '/rest/v1/';
      this.proxyurl = '';
    }
  }
  getFirstData(){
      /*return this.http.get(FIRST_DATA_URL)
      .map(res => res.json())
      .subscribe(data => {console.log(data)});*/

      return this.http.get(FIRST_DATA_URL).map((response: Response) => response.json());
    }

    getSingleId(single_id){
      return this.http.get(SINGLE_DATA_URL + single_id).map((response: Response) => response.json());
    }


    getTotalData(){
      /*
      return this.http.get(FIRST_DATA_URL)
      .map(res => res.json())
      .subscribe(data => {console.log(data)});
      */

      return this.http.get(TOTAL_DATA_URL).map((response: Response) => response.json());
    }
    getSocket() {

      return this.socket
      .fromEvent<any>("live")
      .map(res => res
        // datayı burada işlemeyi dene !!
      /*
      {
         this.liste[data.data[0].details.matchid] = data.data[0].details
         console.log()
       }
       */
       );


    }

    sendMessage(msg: string) {
      this.socket
      .emit('type', 'betting');
    }

    close() {
      this.socket.removeAllListeners('live')
      //this.socket.disconnect()
    }

    getLogin(path) {
      return this.http.get(this.proxyurl + this.OUT_API + path, this.jwt()).map((response: Response) => response.json());
    }

    postLogin(path, formData) {
    return this.http.post(this.proxyurl + this.OUT_API + path, formData).map((response: Response) => response.json());
    } 

    private jwt() {
    const currentUserToken = JSON.parse(localStorage.getItem('current_token'));
    if (currentUserToken) {

            const headers = new Headers({
                'Authorization' : 'Bearer ' + currentUserToken,
                'Content-Type': 'application/json; charset=UTF-8'
              });
              return new RequestOptions({ headers: headers });
    }
}
  }
