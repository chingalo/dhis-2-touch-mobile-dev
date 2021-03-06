import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

/**
 * Generated class for the OptionSetInputFieldComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'option-set-input-field',
  templateUrl: 'option-set-input-field.html'
})
export class OptionSetInputFieldComponent implements OnInit{

  @Input() dataElementId;
  @Input() categoryOptionComboId;
  @Input() data;
  @Input() options;
  @Output() onChange = new EventEmitter();
  inputFieldValue : any;
  //{"id":"s46m5MS0hxu-Prlt0C1RF0s","value":"1","status":"synced"}
  //id = dataElementId + "-" + categoryOptionComboId
  constructor() {}

  ngOnInit(){
    let fieldId = this.dataElementId + "-" + this.categoryOptionComboId;
    if(this.data && this.data[fieldId]){
      this.inputFieldValue  = this.data[fieldId].value;
    }
  }

  updateValues(){
    let fieldId = this.dataElementId + "-" + this.categoryOptionComboId;
    if(this.data && this.data[fieldId] && this.inputFieldValue  != this.data[fieldId].value){
      this.onChange.emit({"id":fieldId,"value":this.inputFieldValue,"status":"not-synced"});
    }else if(this.data && !this.data[fieldId]){
      if(this.inputFieldValue){
        this.onChange.emit({"id":fieldId,"value":this.inputFieldValue,"status":"not-synced"});
      }
    }
  }

}
