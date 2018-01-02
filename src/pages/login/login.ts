import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {HttpClientProvider} from "../../providers/http-client/http-client";

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
export class LoginPage implements OnInit {

  logoUrl: string;
  progressBar: string;
  loginInstance: string;
  isLoginProcessActive: boolean;
  currentUser: any = {};
  animationEffect: any = {};
  processCount: any = {
    downloaded: 0, saved: 0, totalProcess: 10
  };

  constructor(private navCtrl: NavController, private menu: MenuController,private httpClientProvider : HttpClientProvider) {
  }

  ngOnInit() {
    this.animationEffect = {
      loginForm: "animated slideInUp",
      progressBar: "animated bounceIn"
    };
    this.currentUser = {
      serverUrl: "play.hisptz.org/27",
      username: "admin",
      password: "district"
    };
    this.menu.enable(false);
    this.logoUrl = 'assets/img/logo.png';
    this.isLoginProcessActive = false;
  }

  startLoginProcess() {
    this.progressBar = "0";
    this.processCount.downloaded = 0;
    this.processCount.saved = 0;
    this.loginInstance = this.currentUser.serverUrl;
    this.isLoginProcessActive = true;
    this.animationEffect.loginForm = "animated slideOut";
    this.animationEffect.progressBar = "animated bounceIn";
    setTimeout(() => {
      this.downloading(2000);
      this.downloading(4000);
      this.downloading(2700);
      this.downloading(3000);
      this.downloading(1800);
    }, 400);
  }

  updateProcessStatus(data) {
    this.animationEffect.progressBar = "animated bounceOut";
    this.animationEffect.loginForm = "animated flipInY";
    setTimeout(() => {
      this.isLoginProcessActive = data.isProcessActive;
    }, 300);

  }

  downloading(time) {
    console.log("Downloading ...");
    setTimeout(() => {
      this.processCount.downloaded++;
      this.updateProgress();
      this.saving(time / 2);
      console.log("Complete downloading process");
    }, time);
  }

  saving(time) {
    console.log("Saving ...");
    setTimeout(() => {
      this.processCount.saved ++;
      this.updateProgress();
      console.log("Complete saving process")
    }, time);
  }

  updateProgress() {
    let sum = this.processCount.saved + this.processCount.downloaded;
    console.log("sum 10: ",sum);
    if(sum == this.processCount.totalProcess){
      this.navCtrl.setRoot(TabsPage);
    }else{
      let value = (sum / this.processCount.totalProcess) * 100;
      this.progressBar = String(value);
    }
  }


}
