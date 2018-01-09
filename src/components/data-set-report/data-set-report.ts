import {Component, Input, OnInit} from '@angular/core';
import {AppProvider} from "../../providers/app/app";
import {DataSetReportProvider} from "../../providers/data-set-report/data-set-report";
import {DataEntryFormProvider} from "../../providers/data-entry-form/data-entry-form";
import {SettingsProvider} from "../../providers/settings/settings";

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
  @Input() currentUser;

  isLoading : boolean;
  loadingMessage : string;
  dataSet : any;
  sectionIds : any;
  appSettings : any;
  entryFormSections : any;

  constructor(private appProvider : AppProvider,
              private settingsProvider : SettingsProvider,
              private dataEntryFormProvider : DataEntryFormProvider,
              private dataSetReportProvider : DataSetReportProvider) {
  }

  ngOnInit(){
    this.isLoading = true;
    if(this.currentUser){
      this.settingsProvider.getSettingsForTheApp(this.currentUser).then((appSettings:any)=>{
        this.appSettings = appSettings;
        this.loadingMessage = "loading_data_set_report_information";
        this.dataEntryFormProvider.loadingDataSetInformation(this.dataSetId,this.currentUser).then((dataSetInformation : any)=>{
          this.dataSet = dataSetInformation.dataSet;
          this.sectionIds = dataSetInformation.sectionIds;
          this.loadingMessage = "prepare_data_set_report";
          this.dataEntryFormProvider.getEntryForm(this.sectionIds,this.dataSet.id,this.appSettings,this.currentUser).then((entryFormSections : any)=>{
            if(this.sectionIds.length == 0){
              entryFormSections.forEach((section : any)=>{
                section.name = "";
              })
            }
            console.log(JSON.stringify(entryFormSections));
            this.entryFormSections = entryFormSections;
            this.dataSetReportProvider.getDataSetReportValues(this.selectedOrganisationUnit,this.dataSetId).then((response: any)=>{
              this.isLoading = false;
            }).catch(error=>{
              this.isLoading = false;
            });
          }).catch(error=>{
            this.isLoading = false;
            this.loadingMessage = "";
            this.appProvider.setNormalNotification("Fail to prepare data set report");
          })
        },error=>{
          this.isLoading = false;
          this.loadingMessage = "";
          this.appProvider.setNormalNotification("Fail to load data set report information");
        })
      });

    }
  }



}
