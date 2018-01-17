import {Component, OnInit} from '@angular/core';
import { NavController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {UserProvider} from "../../providers/user/user";
import {DashboardServiceProvider} from "../../providers/dashboard-service/dashboard-service";
import {NetworkAvailabilityProvider} from "../../providers/network-availability/network-availability";
import {BackgroundMode} from "@ionic-native/background-mode";
import {AppTranslationProvider} from "../../providers/app-translation/app-translation";

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

  constructor(private navCtrl: NavController,
              private UserProvider : UserProvider,
              private DashboardServiceProvider : DashboardServiceProvider,
              private NetworkAvailabilityProvider : NetworkAvailabilityProvider,
              private appTranslationProvider : AppTranslationProvider,
              private backgroundMode: BackgroundMode) {
  }

  ngOnInit(){
    this.logoUrl = 'assets/img/logo.png';
    this.backgroundMode.enable();
    this.NetworkAvailabilityProvider.setNetworkStatusDetection();
    this.DashboardServiceProvider.resetDashboards();
    this.UserProvider.getCurrentUser().then((user : any)=>{
      let currentLanguage = "en";
      if(user && user.currentLanguage){
        currentLanguage = user.currentLanguage;
      }
      this.appTranslationProvider.setAppTranslation(currentLanguage);
      if(user && user.isLogin){
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    },error=>{
    });
  }

}
