import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController,} from 'ionic-angular';
import {LocalInstanceProvider} from "../../../providers/local-instance/local-instance";
import {AppProvider} from "../../../providers/app/app";
import {TabsPage} from "../../tabs/tabs";
import {UserProvider} from "../../../providers/user/user";

/**
 * Generated class for the AvailableLocalInstancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-available-local-instance',
  templateUrl: 'available-local-instance.html',
})
export class AvailableLocalInstancePage implements OnInit{

  localInstances : any;
  isLoading :boolean;
  loadingMessage : string;


  constructor(private navCtrl: NavController,
              private UserProvider : UserProvider,
              private localInstanceProvider : LocalInstanceProvider,
              private appProvider : AppProvider) {
  }

  ngOnInit(){
    this.isLoading = true;
    this.loadingMessage = "loading_available_local_instances";
    this.localInstanceProvider.getLocalInstances().then((instances : any)=>{
      this.localInstances = instances;
      this.isLoading = false;
    }).catch((error)=>{
      this.isLoading = false;
      this.appProvider.setNormalNotification("Fail to load available local instances")
    });
  }

  setCurrentUser(currentUser){
    currentUser.isLogin = true;
    this.UserProvider.setCurrentUser(currentUser).then(()=>{
      this.navCtrl.setRoot(TabsPage);
    });
  }

}
