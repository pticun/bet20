import { Component, Input } from '@angular/core';
import { SocketService } from './socket.service';
import {LiveModelOneTest} from './model';
import * as oddlang from './oddslang.json';

@Component({
  selector: 'tournpart',
  templateUrl: './tournpart.component.html',
  styleUrls: ['./app.component.css'],
})
export class TournPartComponent {

  @Input("ids") ids : any
  @Input("alldata") alldata : any
  @Input("sport") sportid : any
  @Input("filterhead") filterhead : any
  liveModelDemo : any = LiveModelOneTest
  currentOpen : any = null
  lang : any = 'tr'
  oddLanguages : any = oddlang
  newLang : any
  listeDetay : any = {}

  //ilk açılan live sayfasında talep edilecek ilk 4 odds
  firstOdds : any = {
        '1' : { one : '20', two : '64', three : '50', four : '830'},
        '2' : { one : '20', two : '737', three : '8974', four : '50'},
        '5' : { one : '710', two : '711', three : '894', four : '895'},
        '23' : { one : '50', two : '7102', three : '7103', four : '830'},
        '109' : { one : '61392', two : '7102', three : '71400', four : '81398'},
        '29' : { one : '64', two : '613', three : '50', four : '830'},
        '19' : { one : '7102', two : '64', three : '50', four : '830'},
        '3' : { one : '6335', two : '6198', three : '737', four : '863'},
        '4' : { one : '20', two : '64', three : '50', four : '716'}
      }
  sbvs : any = {
        '50' : 1,
        '711' : 1,
        '895' : 1,
        '7103' : 1
      }

  constructor(private socketService : SocketService) {

  }



  ngOnInit() {
    //Object.values(obj)
    //console.log(LiveModelOneTest)
    //LiveModelOneTest['deneme'] = 'denedim'
  }

  getKeys(keys){
    return Object.keys(keys)
  }

  oddParse(){
    let newLangFile = {}
    this.oddLanguages.map(l => {
      newLangFile[l.type + '' + l.subtype] = l.name
    })
    this.newLang = newLangFile
    console.log(newLangFile[50])
  }

  panelAc(matchid){
    //currenOpen 0 değilse 0 yap *task listesi
    if (this.currentOpen === matchid) {
      this.currentOpen = null
    } else {

      this.socketService
      .getSingleId(matchid)
      .subscribe(data => {
        this.currentOpen = matchid
        //this.currentOpen = data.data[matchid]
        LiveModelOneTest.details.do[matchid] = data.data[matchid]
        LiveModelOneTest.details.do[matchid]['denedimbak'] = 'aferin'
        LiveModelOneTest.markets.mo[matchid] = data.data[matchid].markets
        this.getMarket(matchid, data.data[matchid].markets)
        delete LiveModelOneTest.details.do[matchid]['markets']
        //console.log()
        //this.currentOpenId = id
        // this.currentStatus = 1
        //console.log(matchid, LiveModelOneTest)
        //return Object.keys(data.data[matchid].markets)

      });


    }





    //console.log(this.alldata.details.do[matchid])
  }

  getMarket(id, markets){
    let keysMarkets = Object.keys(markets) //bir maçın marketleri
    let bosArray = []
    keysMarkets.map(mi => {
      if (markets[mi]) {
        //sadece aktif olanları kullanır
        // LiveModelOneTest.markets.om[id][mi] = markets[mi]
        //bosArray.concat(markets[mi])
        bosArray.push(markets[mi])
      }
    })


    bosArray.sort((x, y) => {

      if (x['sbv'] > y['sbv']) {
        //marketin oranları asc olarak sıralanır
        return 1
      }
      return 0
    })


    bosArray.map(mis => {
      if (!this.listeDetay[mis.typeid + '' + mis.subtype + '' + mis.matchid]) {
        this.listeDetay[mis.typeid + mis.subtype + mis.matchid] = mis.id
      }
    })


    //return (bosArray.length > 0 ? 1 : 0)
console.log(this.listeDetay)
  }

}


