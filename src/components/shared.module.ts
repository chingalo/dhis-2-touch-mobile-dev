import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {ProgressBarComponent} from './progress-bar/progress-bar';
import {LoadingPage} from "./loading/loading";

@NgModule({
  declarations: [
    ProgressBarComponent,
    LoadingPage,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ProgressBarComponent,
    LoadingPage
  ]
})

export class SharedModule { }
