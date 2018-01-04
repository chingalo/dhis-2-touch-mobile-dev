import { Component,Input,Output, EventEmitter,OnInit } from '@angular/core';
import {OrganisationUnitsProvider} from "../../providers/organisation-units/organisation-units";
import {AppProvider} from "../../providers/app/app";

/**
 * Generated class for the OrganisationUnitTreeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'organisation-unit-tree',
  templateUrl: 'organisation-unit-tree.html'
})
export class OrganisationUnitTreeComponent implements OnInit {

  @Input() currentUser;
  @Input() organisationUnit;
  @Input() hasOrgUnitChildrenOpened;
  @Input() currentSelectedOrgUnitName;
  @Output() selectedOrganisationUnit = new EventEmitter();

  isOrganisationUnitsFetched : boolean = true;
  hasErrorOccurred : boolean = false;
  hasOrgUnitChildrenLoaded : boolean;

  constructor(private organisationUnitProvider : OrganisationUnitsProvider,private appProvider : AppProvider) {
  }

  ngOnInit(){
    let lastSelectedOrgUnit = this.organisationUnitProvider.lastSelectedOrgUnit;
    let parentCopy = lastSelectedOrgUnit.path.substring(1, lastSelectedOrgUnit.path.length).split("/");
    if(parentCopy.indexOf(this.organisationUnit.id) > -1){
      lastSelectedOrgUnit.ancestors.forEach((ancestor: any)=>{
        if(ancestor.id == this.organisationUnit.id){
          this.toggleOrganisationUnit(ancestor);
        }
      });
    }
  }

  toggleOrganisationUnit(organisationUnit){
    if (this.hasOrgUnitChildrenOpened[organisationUnit.id]) {
      this.hasOrgUnitChildrenOpened[organisationUnit.id] = !this.hasOrgUnitChildrenOpened[organisationUnit.id];
    }else if(Object.keys(this.hasOrgUnitChildrenOpened).indexOf(organisationUnit.id) > -1){
      this.hasOrgUnitChildrenOpened[organisationUnit.id] = !this.hasOrgUnitChildrenOpened[organisationUnit.id];
      this.isOrganisationUnitsFetched = true;
      this.hasOrgUnitChildrenLoaded = true;
      this.hasErrorOccurred = false;
    }else{
      this.isOrganisationUnitsFetched = false;
      this.hasOrgUnitChildrenLoaded = false;
      this.hasOrgUnitChildrenOpened[organisationUnit.id] = true;
      let childrenOrganisationUnitIds = this.getOrganisationUnitsChildrenIds(organisationUnit);
      this.organisationUnitProvider.getOrganisationUnitsByIds(childrenOrganisationUnitIds,this.currentUser).then((childrenOrganisationUnits:any)=>{
        this.organisationUnit.children = childrenOrganisationUnits;
        this.isOrganisationUnitsFetched = true;
        this.hasOrgUnitChildrenLoaded = true;
        this.hasErrorOccurred = false;
      },error=>{
        console.log(JSON.stringify(error));
        let message = "Fail to load organisation unit children for " + organisationUnit.name;
        this.appProvider.setNormalNotification(message);
        this.isOrganisationUnitsFetched = true;
        this.hasOrgUnitChildrenLoaded = true;
        this.hasErrorOccurred = true;
      });
    }
  }

  setSelectedOrganisationUnit(selectedOrganisationUnit){
    this.selectedOrganisationUnit.emit(selectedOrganisationUnit)
  }

  getOrganisationUnitsChildrenIds(organisationUnit){
    let childrenIds = [];
    for(let children of organisationUnit.children){
      childrenIds.push(children.id);
    }
    return childrenIds;
  }

}
