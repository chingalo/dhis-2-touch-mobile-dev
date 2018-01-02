import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {ProgressBarComponent} from './progress-bar/progress-bar';
import {LoadingPage} from "./loading/loading";
import {AppFeaturesSlideComponent} from "./app-features-slide/app-features-slide";

@NgModule({
  declarations: [
    ProgressBarComponent,
    AppFeaturesSlideComponent,
    LoadingPage,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ProgressBarComponent,
    AppFeaturesSlideComponent,
    LoadingPage
  ]
})

export class SharedModule { }
