import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {AppProvider} from "../../providers/app/app";

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

  constructor(private navCtrl: NavController, private appProvider : AppProvider) {
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
        this.setView('ReportsPage');
      }else if(key == "dashboard"){
        this.appProvider.setNormalNotification('This has been disabled')
      }else if(key == "tracker_capture"){
        this.setView('TrackerCapturePage');
      }else if(key == "sync"){
        this.setView('SyncPage')
      }else if(key == "settings"){
        this.setView('SettingsPage');
      }
    },60);
  }
  setView(viewName){
    this.navCtrl.push(viewName).then(()=>{})
  }

  applyAnimation(key : any){
    this.animationEffect[key] = "animated bounceIn";
    setTimeout(()=>{
      this.animationEffect[key] = "";
    },100);
  }

}
