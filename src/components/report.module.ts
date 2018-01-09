import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {DataSetReportComponent} from "./data-set-report/data-set-report";
import {SharedModule} from "./shared.module";

@NgModule({
  declarations: [DataSetReportComponent],
  imports: [
    IonicModule,SharedModule,
  ],
  exports: [DataSetReportComponent]
})

export class ReportModule { }
