import { Component, OnInit } from '@angular/core';
const appSettings = require("tns-core-modules/application-settings");

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  boardingTime: string;
  tripTime: string;
  arrivalTime: string;
  redEye: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(`Boarding time: ${appSettings.getNumber("boardingHour")}:${appSettings.getNumber("boardingMinute")}`);
    console.log(`Trip time: ${appSettings.getNumber("travelTime")}`);

    this.calculateArrivalTime();

    this.boardingTime = `Boarding time: ${appSettings.getNumber("boardingHour")}:${appSettings.getNumber("boardingMinute")}`;
    this.tripTime = `Travel time: ${appSettings.getNumber("travelTime")}min`;    
  }

  calculateArrivalTime(){
    var startHour = appSettings.getNumber("boardingHour");
    var startMin = appSettings.getNumber("boardingMinute");
    var travelTime = appSettings.getNumber("travelTime");
    var tempHour;
    var tempMin;
    var endHour;
    var endMin;

    tempHour = Math.floor(travelTime/60);
    tempMin = travelTime%60;
    console.log(tempHour);
    console.log(tempMin);

    endMin = startMin + tempMin;
    if(endMin > 59){
      endMin -= 60;
      tempHour += 1;
    }
    if(endMin < 10){
      endMin = `0${endMin}`
    }

    endHour = startHour + tempHour;
    if(endHour >= 24){
      endHour -= 24;
      if(endHour == 0){
        endHour = 1;
      }
    }
    if(endHour <= 6){
      this.redEye = true;
    }
    
    console.log('End: ' + endHour);
    console.log('End: ' + endMin);

    this.arrivalTime = `Arrival time: ${endHour}:${endMin}`;
  }

}
