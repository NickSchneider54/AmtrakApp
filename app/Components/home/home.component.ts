import { Component } from '@angular/core';
import { TimePicker } from "tns-core-modules/ui/time-picker";
import { TextField } from "tns-core-modules/ui/text-field";
import { Router } from '@angular/router';
import { alert, prompt, PromptOptions, PromptResult, capitalizationType, inputType } from "tns-core-modules/ui/dialogs";
import { NgModel } from '@angular/forms';
const appSettings = require("tns-core-modules/application-settings");
const dialogs = require("tns-core-modules/ui/dialogs");

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Amtrak_App_v2.0';
  todayObj: Date = new Date();
  boardingHour: number = new Date().getHours();
  boardingMinute: number = new Date().getMinutes();
  tripTime: string = '0';

  constructor(private router: Router) { }  

  ngOnInit(){
    this.tripTime = '0';
    this.setTime();
  }

  onTimeChanged(args) {
    const tp = args.object as TimePicker;
    this.boardingHour = tp.hour;
    this.boardingMinute = tp.minute;    
    this.setTime();
  }

  setTime(){
    appSettings.setNumber("boardingHour", this.boardingHour);
    appSettings.setNumber("boardingMinute", this.boardingMinute);
    appSettings.setNumber("travelTime", 0);
    console.log(`Chosen time: ${appSettings.getNumber("boardingHour")}:${appSettings.getNumber("boardingMinute")}`);
  }

  calculateArrivalTime(){
    if(appSettings.getNumber("travelTime") > 1500){
      this.displayExcedeDialog();
    }
    else if(appSettings.getNumber("travelTime") <= 0){
      this.displayUnderDialog();
    }
    else{
      this.router.navigate(['results']);
    }
  }

  displayExcedeDialog() {
    let options = {
        title: "Error: 503224",
        message: "Trip time cannot excede 1500 minutes",
        okButtonText: "OK"
    };

    alert(options).then(() => {
        
    });
  }

  displayUnderDialog(){
    let options = {
      title: "Error: 503223",
      message: "Trip time must be greater than 0 minutes",
      okButtonText: "OK"
    };

    alert(options).then(() => {
        
    });
  }

  onFocus(){
    let options: PromptOptions = {
      title: "Travel Time",
      message: "Please enter in minutes",
      inputType: inputType.text,
      okButtonText: "OK",
      cancelButtonText: "Cancel",
    };
    prompt(options).then(function(result: PromptResult){          
      if(result.text != ''){
        appSettings.setNumber("travelTime", parseInt(result.text));
      }
      else{
        appSettings.setNumber("travelTime", 0);
      }
      console.log(appSettings.getNumber("travelTime").toString());
    }); 
    
  }

  getTravelTime(){
    if(appSettings.getNumber("travelTime") < 0){
      this.displayUnderDialog();
      appSettings.setNumber("travelTime", 0);
      return 0;
    }
    else{
      return appSettings.getNumber("travelTime");
    }
  }

}
