import { Component, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public menuOpened =true
  deviceInfo:any;

  constructor(
    private mainService:MainService,
    private deviceService: DeviceDetectorService) { 
    this.deviceInfo = this.deviceService.getDeviceInfo()
    const isMobile = this.deviceService.isMobile();
    this.mainService.getMenuOpenedStatus().subscribe(value=>{   
      if(isMobile){
        this.menuOpened = value
      }
    })
  }

  ngOnInit(): void {
  }

}
