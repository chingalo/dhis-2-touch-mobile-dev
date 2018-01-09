import {Component, Input, OnInit} from '@angular/core';
import {AppProvider} from "../../providers/app/app";

/**
 * Generated class for the DataSetReportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'data-set-report',
  templateUrl: 'data-set-report.html'
})
export class DataSetReportComponent implements OnInit{

  @Input() dataSetId;
  @Input() selectedPeriod;
  @Input() selectedOrganisationUnit;

  isLoading : boolean;

  constructor(private appProvider : AppProvider) {
  }

  ngOnInit(){
    this.isLoading = true;


  }

  getOrganisationUnitHierarchy(organisationUnit){
    let organisationUnitHierarchy = [];
    organisationUnitHierarchy.push({id : organisationUnit.id,name : organisationUnit.name});
    if(organisationUnit.ancestors){
      let length = organisationUnit.ancestors.length;
      for(let index = length -1; index >= 0; index --){
        organisationUnitHierarchy.push(organisationUnit.ancestors[index]);
      }
    }
    return organisationUnitHierarchy;
  }

}
