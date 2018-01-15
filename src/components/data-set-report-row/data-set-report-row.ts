import {Component, Input, OnInit} from '@angular/core';

/**
 * Generated class for the DataSetReportRowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'data-set-report-row',
  templateUrl: 'data-set-report-row.html'
})
export class DataSetReportRowComponent implements OnInit{

  @Input() dataElement;
  @Input() appSettings;
  @Input() dataValues;

  fieldLabelKey : string;

  constructor() { }

  ngOnInit(){
    if(this.dataElement && this.dataElement.displayName){
      this.fieldLabelKey = this.dataElement.displayName;
      let dataEntrySettings = this.appSettings.entryForm;
      if(dataEntrySettings.label){
        if(this.dataElement[dataEntrySettings.label] && this.dataElement[dataEntrySettings.label] != '0'){
          this.fieldLabelKey = this.dataElement[dataEntrySettings.label];
        }
      }
    }
  }

  getListLayoutLabel(categoryComboName,categoryOptionComboName){
    let label = this.fieldLabelKey;
    if(categoryComboName != 'default'){
      label += " " + categoryOptionComboName;
    }
    return label;
  }

}
