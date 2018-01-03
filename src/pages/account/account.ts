import {Component, OnInit} from '@angular/core';
import {App,} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserProvider} from "../../providers/user/user";
import {OrganisationUnitsProvider} from "../../providers/organisation-units/organisation-units";

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

  constructor(private app : App,private organisationUnitProvider : OrganisationUnitsProvider, private userProvider : UserProvider) {
  }

  ngOnInit(){

  }

  goToView(){

  }

  async logOut(){
    try{
      let user :any = await this.userProvider.getCurrentUser();
      user.isLogin = false;
      this.userProvider.setCurrentUser(user).then(()=>{
        this.organisationUnitProvider.resetOrganisationUnit();
        this.app.getRootNav().setRoot('LoginPage');
      });
      this.app.getRootNav().setRoot(LoginPage);
    }catch (e){
      console.log(JSON.stringify(e));
    }
  }

}
