import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { INCREMENT, DECREMENT, RESET } from '../ngrx/counter';
import { Observable } from 'rxjs/Observable';
import { LOGIN, LOGOUT, initialData } from '../ngrx/auth';
import * as _ from 'underscore';

declare var window: any;
//import * as data from './category.json';
@Component({
  selector: 'sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent  implements OnInit, AfterViewInit {
  coupons : any = {}
  un = _
  totalDataArray : any = []
  totalDataArray2 : any = []
  totalDataObject : any
  totalcats : any = {}
  totalsport : any = {}
  totaltournament : any = {}
  totalMarkets : any = {}
  upcomingMatches : any[] = []
  allMatches : any[] = []
  sportListe : Object
  sportsName : Object
  totalMatch : any
  firstArr = [
    //"https://cs.betradar.com/ls/widgets/?/redsoft/tr/Europe:Istanbul/widgetloader/widgets/redsoft"
  ]
  constructor(private socketService : SocketService, private router: Router, private store: Store<any>) {
    // this.fetcLocal()
    //this.fetchTotalData()
    
    this.getPress()
  }
ngAfterViewInit(){
  window.$('a.fancybox').fancybox();
  window.jsLoad(this.firstArr);
}

widgetAc(matchId){
  //https://cs.betradar.com/ls/widgets/?/redsoft/tr/Europe:Istanbul/page/widgets_lmts#matchId=

  window.$("a.fancybox").fancybox({
    helpers : {
     title : { type : 'inside' }
    },
    beforeLoad: function() {
     this.title = window.$(this.element).attr('caption');
    }
   });
}
  ngOnInit() {}




  fetchTotalData(){
    this.socketService
    .getTotalData()
    .subscribe(data => {
      this.totalDataArray = Object.keys(data.data)
      //let demoasd = data.data
      this.totalDataObject = data.data
      //console.log(this.totalDataArray.length)
      // console.log(this.totalDataObject)
      this.totalDataArray.map((x) => {
        this.totalcats[this.totalDataObject[x]['category_id']] = this.totalDataObject[x]['category']
        this.totalsport[this.totalDataObject[x]['sport_id']] = this.totalDataObject[x]['sport']
        this.totaltournament[this.totalDataObject[x]['tournament_id']] = this.totalDataObject[x]['tournament']
        this.totalMarkets[x] = this.totalDataObject[x]['markets']
        this.totalDataObject[x]['sport'] = 0
        this.totalDataObject[x]['category'] = 0
        this.totalDataObject[x]['tournament'] = 0
        this.totalDataObject[x]['markets'] = 0;

      });

      //console.log(this.totalsport)
      //console.log(this.totalcats)
      //console.log(this.totaltournament)

    });

  }

  setChange(){
    this.totalDataArray.map((x) => {
      this.totalDataObject[x]['markets'] = 0;
    });
  }

  getPress() : void {
    this.sportListe = initialData.sportListe
    this.sportsName = initialData.sportsName
    this.totalMatch = initialData.totalMatch
    if (!initialData.sportListe) {
      this.socketService
      .getLogin('sportsbook')
      .subscribe(data => {
        let bosObje = {}
        let bosArr = []
  
        this.upcomingMatches = Object.values(data.upcomingMatches)
        this.allMatches = Object.values(data.allMatches)
  
        let sports : any = _.groupBy(Object.values(data.upcomingMatches), 'sport_id');
        let tournaments : any = _.groupBy(Object.values(data.upcomingMatches), 'tournament_id');
        let categories : any = _.groupBy(Object.values(data.upcomingMatches), 'category_id');
  
        _.map(sports, function(item, sportId){
          bosObje[sportId] = {}
          let categorie = _.groupBy(Object.values(item), 'category_id');
          _.map(categorie, function(cat, catId){
            let tournement = _.groupBy(Object.values(cat), 'tournament_id');
            bosObje[sportId][catId] = tournement
          })
        });
  this.sportsName = data.sports
        //this.sportListe = bosObje
        initialData.sportsName = data.sports
        initialData.totalMatch = data.totalMatch
        this.sportListe = bosObje
        initialData.sportListe = bosObje
        this.totalMatch = data.totalMatch
        this.store.dispatch({ type: RESET });
       // console.log(data)
  
      })
    }
   
  }


  demoFunc() {
    console.log("obj");
  }

  sendCoupon(marketid, typeid){
    if (this.coupons[marketid] == typeid) {
      delete this.coupons[marketid]
    } else {
      this.coupons[marketid] = typeid
    }

console.log(this.coupons);

   /* event.target.className += ' selected'
    //event.target.setAttribute("class", "selected");
    event.target.attributes['someproperty'].value = "donttest";
console.log(event);
*/
  }


}
