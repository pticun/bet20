import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';
@Component({
  selector: 'app-coupon-sidebar',
  templateUrl: './coupon-sidebar.component.html',
  styleUrls: ['./coupon-sidebar.component.css']
})
export class CouponSidebarComponent implements OnInit {
  @Input("setcoupons") setcoupons : any
  @Input("coupons") coupons : any
  un = _
  @Output() removeCoupon : any = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
cleanCoupons(){
  for (var key in this.coupons) {
    if (this.coupons.hasOwnProperty(key)) {
      this.updateCoupon(this.coupons[key])
    }
  }
  
}


  updateCoupon(mi){
   // this.coupons[ckey]
    this.removeCoupon.emit(mi)
  }

}
