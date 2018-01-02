import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the LauncherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-launcher',
  templateUrl: 'launcher.html',
})
export class LauncherPage implements OnInit{

  logoUrl : string;

  constructor(private navCtrl: NavController,private menu : MenuController,) {
  }

  ngOnInit(){
    this.menu.enable(false);
    this.logoUrl = 'assets/img/logo.png';
    setTimeout(()=> {
      this.navCtrl.setRoot(LoginPage);
    },1000)
  }

}
