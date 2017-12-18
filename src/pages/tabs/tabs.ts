import { Component } from '@angular/core';

import {AppsPage} from "../apps/apps";
import {AccountPage} from "../account/account";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AppsPage;
  tab2Root = AccountPage;

  constructor() {

  }
}
