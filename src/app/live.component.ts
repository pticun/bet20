import { Component} from '@angular/core';
import { SocketService } from './socket.service';
import {LiveModelOneTest} from './model'
import * as _ from 'underscore';
@Component({
  selector: 'live',
  templateUrl: './live.component.html',
  styleUrls: ['./app.component.css']
})
export class LiveComponent{
  listeDetay : any = {}
  newIds : any[] = []
  allData : any = LiveModelOneTest
  totalMarket : any = 0
  indexVirtual : number = 0
  constructor(private socketService : SocketService) {
    //önce mevcut aktif maçları alır
    this.fetchFirstData()
    //her x saniyede yeni data varmı kontrol eder
    setInterval(() => {
      this.fetchFirstData()
    }, 15 * 60000);
    //soketi live olarak dinle

    //dinledikten sonra şurayı çalıştırır
    setTimeout(() => {
      this.sendMsg('live')
      this.connectSocketNew()
    }, 6000)

  }


  oddUpdate(){

  }


  fetchFirstData(){
    //console.log(this)
    this.socketService
    .getFirstData()
    .subscribe(data => {
      this.newIds = Object.keys(data.data)

      //önce modelleri güncelleyelim
      this.newIds.map(x => {
        //varsa birleştir yoksa oluştur *task listesi


        if (!LiveModelOneTest.details.dn[x]) {
          LiveModelOneTest.markets.mn[x] = {}
          LiveModelOneTest.details.dn[x] = {}
        }

        if (!LiveModelOneTest.details.do[x]) {
          LiveModelOneTest.markets.mo[x] = {}
          LiveModelOneTest.details.do[x] = {}
        }



      })

      //temiz obje veriyoruz
      this.setData(data.data)
      //this.setState(newObject)
    });
    //let {details, markets} = this.allData
    //console.log("Guncellendi : ", this)
  }



  connectSocketNew(){

    this.socketService
    .getSocket()
    .subscribe(msg => {
      let socketData = null;
      let socketMsgArray = Object.keys(msg.data)

      socketData = msg.data
      socketMsgArray.map(i => {
        //console.log(socketData[i].markets)
        //change id
        let ci = socketData[i].details ? socketData[i].details.matchid : false

        if (LiveModelOneTest.details.do[ci]) {

          if (socketData[i].details) {
            //console.log(socketData[i].details.msgnr)
            Object.assign(LiveModelOneTest.details.do[ci], socketData[i].details);
          }


          //Object.assign(LiveModelOneTest.markets.mn[ci], socketData[i].markets);


          if (socketData[i].markets && LiveModelOneTest.markets.mo[ci]) {
            Object.keys(socketData[i].markets).map(mi => {

              if (
                !_.isUndefined(socketData[i].markets[mi].odds) &&
                !_.isUndefined(LiveModelOneTest.markets.mo[ci][mi])
                ) {

                var marketOld = LiveModelOneTest.markets.mo[ci][mi];









              marketOld.odds.map((omo, index) => {

                //delete LiveModelOneTest.markets.mo[ci][mi].odds[index]['action']
                if (socketData[i].markets[mi].odds[omo.type]) {
                  //this.indexVirtual = index
                  // delete LiveModelOneTest.markets.mo[ci][mi].odds[index]['action']
                  //delete marketOld.odds[index]['action']
                  let soitem = socketData[i].markets[mi].odds[omo.type].value

                  if (soitem > omo.value) {

                    marketOld.odds[index].value =  soitem
                    marketOld.odds[index]['action'] = (marketOld.odds[index]['action'] === 'oup') ? 'odup' : 'oup';

                  }
                  else if (soitem < omo.value) {
                    marketOld.odds[index].value =  soitem
                    marketOld.odds[index]['action'] = (marketOld.odds[index]['action'] === 'odown') ? 'oddown' : 'odown'
                  }

                    /*setTimeout(() => {
                        delete marketOld.odds[index]['action']
                      }, 3000)*/

                    }
                  })
              LiveModelOneTest.markets.mo[ci][mi] = marketOld
            }

          })
          }

        } //if includes

      }) //map

      setTimeout(() => {
        //console.log(msg)
        delete msg.data;
        socketData = null;
      }, 100);

    }) //subscribe

  }


  //burası ilk gelen datanın biçimlendiği yer
  setData(data){
    //Markets
    this.newIds.map(x => {

      if (data[x].active === '1') {

        this.getMarket(x, data[x].markets)
        LiveModelOneTest.markets.mo[x] = data[x].markets
        LiveModelOneTest.details.do[x] =  data[x]
        delete LiveModelOneTest.details.do[x]['markets']

        setTimeout(() => {
          delete data[x]
        }, 200)
      }



    });
    //details
   /*
    this.newIds.map((x) => {
      //Object.assign(LiveModelOneTest.details.od[x], data[x].markets);
      LiveModelOneTest.details.od[x] =  data[x]
      this.newDetails[x] = data[x];
    });
    */

    this.setState(data)
  }

  setChange(id, data){
    this.newIds.map((x) => {
      // this.newChange[x].details = data.details;
      //this.newChange[x].markets = data.markets;
    });
  }
  getKeys(term){
    return Object.keys(LiveModelOneTest.taxonomies[term])
  }

  objectKeys(){

  }
  sendMsg(msg){
    this.socketService.sendMessage(msg)
  }

  setState(newObject){
    let cleanObject = {
      sport : {},
      category : {},
      tournament : {},
      tourkeys : {}
    }

    this.newIds.map((x) => {
      let cleanKeys = {}
      cleanObject.sport[newObject[x].sport_id] = newObject[x].sport
      cleanObject.category[newObject[x].category_id] = newObject[x].category
      cleanObject.tournament[newObject[x].tournament_id] = newObject[x].tournament
/*
if (!Array.isArray(cleanObject.tourkeys[newObject[x].tournament_id])) {
  cleanObject.tourkeys[newObject[x].tournament_id] = []
}
*/

if (!cleanObject.tourkeys[newObject[x].tournament_id]) {
  cleanObject.tourkeys[newObject[x].tournament_id] = []
}

cleanObject.tourkeys[newObject[x].tournament_id].push(x)

newObject[x].sport = 1
newObject[x].category = 1
newObject[x].tournament = 1
})


    Object.keys(cleanObject.tournament).map(ti => {
      cleanObject.tournament[ti]
    })


    LiveModelOneTest.taxonomies = cleanObject
    //this.stateMan = LiveModelOneTest.taxonomies
    //this.allData = LiveModelOneTest
    //console.log(LiveModelOneTest)
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
      if (!this.listeDetay[mis.typeid + mis.subtype + mis.matchid]) {
        this.listeDetay[mis.typeid + mis.subtype + mis.matchid] = mis.id
      }
    })


    //return (bosArray.length > 0 ? 1 : 0)

  }

  listeizin(key, id){
    if (!this.listeDetay[key]) {
      this.listeDetay[key] = id
    }
    return 1
  }

  sbvSelect(obje){

    let keysMarkets = Object.keys(obje);
    let bosArray = []
    keysMarkets.map(mi => {
      if (obje[mi].active === '1') {
        bosArray.push(obje[mi])
      }
    })

    bosArray.sort((x,y) =>{
      if (x.typeid === '5' && y.subtype === '0') {

      }
      return x.sbv - y.sbv
    })


    //   console.log(bosArray[0])

    return bosArray[0]

  }


}
//https://stackoverflow.com/questions/42978082/what-is-let-in-angular-2-templates
