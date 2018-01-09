import {Injectable} from '@angular/core';

/*
  Generated class for the DataSetReportProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataSetReportProvider {

  constructor() {
  }

  getDataSetReportValues(orgUnit,dataSet,dataDimension?){
    return new Promise((resolve,reject)=>{
      resolve();
    });
  }

  getDataSetReportOrganisationUnitIds(selectedOrganisationUnit) {
    let organisationUnitIds = [];
    console.log(selectedOrganisationUnit.path.split(selectedOrganisationUnit.id));

  }

}
