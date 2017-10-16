import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { initialData } from '../ngrx/auth';
@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  rootPath = 'https://www.moxbet1.com/banner/'
  sliders: any
  constructor(
    private socketService: SocketService
  ) {

  }

  ngOnInit() {
    this.dataGetCasino()
  }

  dataGetCasino() {
    this.sliders = initialData.casino.sliders
    if (!initialData.casino) {
      this.socketService
        .getLogin('casino')
        .subscribe((data) => {
          console.log(data);
          initialData.casino = data
          this.sliders = initialData.casino.sliders
        })
    }

  }

}
