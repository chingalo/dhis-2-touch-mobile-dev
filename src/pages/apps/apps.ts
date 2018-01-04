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
        this.setView('DataEntryPage');
      }else if(key == "event_capture"){
        this.setView('EventCapturePage');
      }else if(key == "reports"){
        console.log(key);
      }else if(key == "dashboard"){
        console.log(key);
      }else if(key == "tracker_capture"){
        console.log(key);
      }else if(key == "sync"){
        this.setView('SyncPage')
      }else if(key == "settings"){
        this.setView('SettingsPage');
      }
    },100);
  }
  setView(viewName){
    this.navCtrl.push(viewName).then(()=>{})
  }

  applyAnimation(key : any){
    this.animationEffect[key] = "animated bounceIn";
    setTimeout(()=>{
      this.animationEffect[key] = "";
    },200);
  }

}
