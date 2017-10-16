import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { initialData } from '../ngrx/auth';
@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  rootPath = 'https://www.moxbet1.com/banner/'
  sliders : any
  allSlotData : any = {}
    constructor(
      private socketService: SocketService
    ) {
  
    }
  
    ngOnInit() {
  this.dataGetSlot()
    }
  
    dataGetSlot(){
      this.sliders = initialData.slot.sliders
      this.allSlotData = initialData.slot
      if (!initialData.slot) {
        this.socketService
        .getLogin('slot')
        .subscribe((data) => {
          console.log(data);
    initialData.slot = data
    this.sliders = initialData.slot.sliders
    this.allSlotData = initialData.slot
        })
      }
  
    }
  
  }