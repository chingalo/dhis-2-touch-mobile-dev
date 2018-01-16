import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableLocalInstancePage } from './available-local-instance';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../../components/shared.module";

@NgModule({
  declarations: [
    AvailableLocalInstancePage,
  ],
  imports: [
    IonicPageModule.forChild(AvailableLocalInstancePage),SharedModule,
    TranslateModule.forChild({})
  ],
})
export class AvailableLocalInstancePageModule {}
