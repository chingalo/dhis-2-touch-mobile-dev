import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

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

  constructor(private viewCtrl: ViewController,
              private params: NavParams) {
  }

  ngOnInit(){

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
