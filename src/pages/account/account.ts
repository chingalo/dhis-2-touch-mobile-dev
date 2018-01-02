import {Component, OnInit} from '@angular/core';
import {App,} from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit{

  constructor(private app : App,) {
  }

  ngOnInit(){

  }

  goToView(){

  }

  async logOut(){
    try{
      // let user :any = await this.UserProvider.getCurrentUser();
      // user.isLogin = false;
      // this.UserProvider.setCurrentUser(user).then(()=>{
      //   this.organisationUnitProvider.resetOrganisationUnit();
      //   this.app.getRootNav().setRoot('LoginPage');
      // })
      this.app.getRootNav().setRoot(LoginPage);
    }catch (e){
      console.log(JSON.stringify(e));
    }
  }

}
