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
export class SportsComponent implements OnInit, AfterViewInit {
  tournamentspre: any = {}
  totalList: any = {}
  coupons: any = {}
  setcoupons: any = {}
  un = _
  totalDataArray: any = []
  totalDataArray2: any = []
  totalDataObject: any
  totalcats: any = {}
  totalsport: any = {}
  totaltournament: any = {}
  totalMarkets: any = {}
  upcomingMatches: any[] = []
  allMatches: any = {}
  sportListe: Object
  sportsName: any = {}
  totalMatch: any = 0
  firstArr = [
    //"https://cs.betradar.com/ls/widgets/?/redsoft/tr/Europe:Istanbul/widgetloader/widgets/redsoft"
  ]
  constructor(
    private socketService: SocketService,
    private router: Router,
    private store: Store<any>,
    private route: ActivatedRoute
  ) {
    // this.fetcLocal()
    //this.fetchTotalData()

    this.getPress()
  }
  ngAfterViewInit() {
    window.$('a.fancybox').fancybox();
    window.jsLoad(this.firstArr);
  }

  widgetAc(matchId) {
    //https://cs.betradar.com/ls/widgets/?/redsoft/tr/Europe:Istanbul/page/widgets_lmts#matchId=

    window.$("a.fancybox").fancybox({
      helpers: {
        title: { type: 'inside' }
      },
      beforeLoad: function () {
        this.title = window.$(this.element).attr('caption');
      }
    });
  }
  ngOnInit() {
    console.log(window.corsProxy);
    
    this.updateYap()

  }

  updateYap() {
    //console.log(this.sportsName);
    /*
      this.totalList = initialData.upcomingMatches
     let demolog =  _.pluck(this.totalList, 'markets')
     console.log(demolog);
     */
    //this.un.groupBy(this.allMatches, 'tournament_id')

    this.route.queryParamMap.subscribe((p: any) => {
      let bosOb = {}
      if (p.params.sport) {
        //bosOb[p.params.sport] = this.un.groupBy(this.upcomingMatches, 'sport_id')[p.params.sport]
        this.totalList = this.un.groupBy(this.allMatches, 'sport_id')[p.params.sport].filter((word: any, index) => index < 50);
        //this.totalList = this.un.groupBy(this.allMatches, 'sport_id')
      }
      else if (p.params.tournament_id) {
        //bosOb[p.params.tournament_id] = this.un.groupBy(this.upcomingMatches, 'tournament_id')[p.params.tournament_id]
        this.totalList = this.un.groupBy(this.allMatches, 'tournament_id')[p.params.tournament_id]
        // console.log(this.un.keys(this.un.groupBy(this.upcomingMatches, 'tournament_id')));
      } else {
        this.totalList = this.upcomingMatches
      }
      console.log((p.params));

      /*  console.log(p.params.sport);
        let bosob = {}
        bosob[p.params.sport] = this.sportListe[p.params.sport]
        this.sportListe = bosob*/
      //this.totalList = this.un.groupBy(this.totalList, 'tournament_id')
    });
  }


  fetchTotalData() {
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

  setChange() {
    this.totalDataArray.map((x) => {
      this.totalDataObject[x]['markets'] = 0;
    });
  }

  getPress(): void {
    this.sportsName = initialData.sportsName
    this.sportListe = initialData.sportListe
    this.totalMatch = initialData.totalMatch
    this.allMatches = initialData.allMatches
    this.totalList = initialData.upcomingMatches
    this.upcomingMatches = initialData.upcomingMatches
    this.tournamentspre = initialData.tournamentspre
    if (!initialData.sportListe) {
      this.socketService
        .getLogin('sportsbook')
        .subscribe(data => {
          let bosObje = {}
          let bosArr = []

          // this.upcomingMatches = Object.values(data.upcomingMatches)
          this.allMatches = data.allMatches

          let sports: any = _.groupBy(Object.values(data.upcomingMatches), 'sport_id');
          let tournaments: any = _.groupBy(Object.values(data.upcomingMatches), 'tournament_id');
          let categories: any = _.groupBy(Object.values(data.upcomingMatches), 'category_id');

          _.map(sports, function (item, sportId) {
            bosObje[sportId] = {}
            let categorie = _.groupBy(Object.values(item), 'category_id');
            _.map(categorie, function (cat, catId) {
              let tournement = _.groupBy(Object.values(cat), 'tournament_id');
              bosObje[sportId][catId] = tournement
            })
          });
          // this.sportsName = data.sports
          //this.sportListe = bosObje
          initialData.sportsName = data.sports
          initialData.totalMatch = data.totalMatch
          initialData.allMatches = data.allMatches
          initialData.upcomingMatches = data.upcomingMatches
          initialData.tournamentspre = data.tournamentspre
          initialData.sportListe = bosObje
          this.sportsName = initialData.sportsName
          this.sportListe = initialData.sportListe
          this.totalMatch = initialData.totalMatch
          this.allMatches = initialData.allMatches
          this.totalList = initialData.upcomingMatches
          this.tournamentspre = initialData.tournamentspre
          this.upcomingMatches = initialData.upcomingMatches
          setTimeout(() => {
            this.store.dispatch({ type: RESET });
          }, 2000);
          // console.log(data)

        })
    }

  }


  demoFunc() {
    console.log("obj");
  }
  removeCoupon(coupon: any) {
    this.sendCoupon(0, coupon.marketid, coupon.odd)
  }
  sendCoupon(matchid, marketid, odd) {


    if (this.setcoupons[matchid]) {
      delete this.setcoupons[matchid]
    }

    if (
      this.coupons[marketid] &&
      this.coupons[marketid]['odd'].typeid == odd.typeid
    ) {
      delete this.coupons[marketid]
    } else {
      // this.setcoupons[matchid] = this.allMatches[matchid]
      this.coupons[marketid] = {}
      this.coupons[marketid]['marketid'] = marketid
      this.coupons[marketid]['odd'] = odd
      this.coupons[marketid]['match'] = this.allMatches[matchid]
    }





    console.log(this.coupons);
    console.log(this.setcoupons);

    /* event.target.className += ' selected'
     //event.target.setAttribute("class", "selected");
     event.target.attributes['someproperty'].value = "donttest";
 console.log(event);
 */
  }


}
