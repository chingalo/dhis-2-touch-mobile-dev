import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{

  logoUrl : string;
  progressBar : string;
  loginInstance : string;
  isLoginProcessActive : boolean;
  currentUser : any;

  constructor(private navCtrl: NavController,private menu : MenuController,) {
  }

  ngOnInit(){
    this.currentUser = {
      serverUrl : "play.hisptz.org/27",
      username : "admin",
      password : "district"
    };
    this.menu.enable(false);
    this.logoUrl = 'assets/img/logo.png';
    this.isLoginProcessActive = false;
  }

  startLoginProcess(){
    this.progressBar = "0";
    this.loginInstance = this.currentUser.serverUrl;
    this.isLoginProcessActive = true;
    setTimeout(()=>{
      this.updateProgress();
    },1000);
  }

  updateProcessStatus(data){
    this.isLoginProcessActive = data.isProcessActive;
  }

  updateProgress(){
    let value = parseInt(this.progressBar);
    value += 5;
    if(value <=100){
      this.progressBar = String(value);
      this.loginInstance = "dhis.moh.go.tz";
      setTimeout(()=>{
        this.updateProgress();
      },1000)
    }
  }

}
