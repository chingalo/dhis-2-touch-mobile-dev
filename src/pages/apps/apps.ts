import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-apps',
  templateUrl: 'apps.html',
})
export class AppsPage implements OnInit{

  animationEffect : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.animationEffect = {
      data_entry : "",
      event_capture : "",
      reports : "",
      dashboard : "",
      tracker_capture : "",
      sync : "",
      settings : ""
    }
  }

  goToView(key){
    this.applyAnimation(key);
    setTimeout(()=>{
      if(key == "data_entry"){
        this.navCtrl.push('DataEntryPage');
      }else if(key == "event_capture"){
        console.log(key);
      }else if(key == "event_capture"){
        console.log(key);
      }else if(key == "reports"){
        console.log(key);
      }else if(key == "dashboard"){
        console.log(key);
      }else if(key == "tracker_capture"){
        console.log(key);
      }else if(key == "sync"){
        console.log(key);
      }else if(key == "settings"){
        console.log(key);
      }
    },150);
  }

  applyAnimation(key : any){
    this.animationEffect[key] = "animated bounceIn";
    setTimeout(()=>{
      this.animationEffect[key] = "";
    },500);
  }

}
