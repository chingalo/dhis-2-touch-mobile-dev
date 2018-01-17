import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

/*
  Generated class for the AppTranslationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppTranslationProvider {

  constructor(private translateService : TranslateService) {}

  test(){
    console.log("getDefaultLang : " + this.translateService.getDefaultLang());
  }

  setAppTranslation(lang?: string){
    this.test();
    if(!lang){
      lang = this.getCurrentLanguage();
    }
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.test();
  }

  getCurrentLanguage(){
    let lang = "en";
    if(this.translateService.getDefaultLang()){
      lang = this.translateService.getDefaultLang();
    }
    return lang;
  }

}
