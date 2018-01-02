import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataEntryPage } from './data-entry';
import {SharedModule} from "../../components/shared.module";

@NgModule({
  declarations: [
    DataEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(DataEntryPage),SharedModule
  ],
})
export class DataEntryPageModule {}
