import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coupon-sidebar',
  templateUrl: './coupon-sidebar.component.html',
  styleUrls: ['./coupon-sidebar.component.css']
})
export class CouponSidebarComponent implements OnInit {
  @Input("setcoupons") setcoupons : any
  @Input("coupons") coupons : any
  constructor() { }

  ngOnInit() {
  }

}
