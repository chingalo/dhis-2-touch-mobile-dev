import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataSetsProvider} from "../../providers/data-sets/data-sets";
import {AlertController, NavController} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {DataValuesProvider} from "../../providers/data-values/data-values";
import {SyncProvider} from "../../providers/sync/sync";
import {error} from "util";
import {AppProvider} from "../../providers/app/app";

/**
 * Generated class for the DataSetSyncComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'data-set-sync',
  templateUrl: 'data-set-sync.html'
})
export class DataSetSyncComponent implements OnInit{

  @Input() dataSetsSyncObjects;
  @Input() hasDataPrepared;
  @Input() dataSetIds;
  @Input() syncStatus;
  @Input() isDataSetDataDeletionOnProgress;
  @Input() syncProcess;

  @Output() onDeleteDataSetData = new EventEmitter();
  @Output() onSyncDataSetData = new EventEmitter();


  displayName: any;
  currentUser: any;


  constructor(public dataSetsProvider: DataSetsProvider, public alertCtrl: AlertController, public user: UserProvider,
              public navCtrl: NavController,public syncProvider: SyncProvider, public appProvider: AppProvider) {

  }

  ngOnInit(){

      this.user.getCurrentUser().then((user)=>{
        this.currentUser = user;

        if(this.dataSetIds && this.dataSetIds.length > 0){
          this.loadDataSetsByIds(this.dataSetIds,this.currentUser);
        }else{
        }
      });
  }

  loadDataSetsByIds(dataSetIds,currentUser){
    this.dataSetsProvider.getDataSetsByIds(dataSetIds,currentUser).then((dataSets : any)=>{
      dataSets.forEach((dataSet :any)=>{
        this.dataSetsSyncObjects[dataSet.id].name = dataSet.name;
      });

    },error=>{

    })
  }



  dataSetDataDeleteConfirmation(dataSetName,dataSetId){
    let alert = this.alertCtrl.create({
      title: 'Clear Data Confirmation',
      message: 'Are you want to clear all data on '+ dataSetName +' ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Clear',
          handler: () => {
            this.deleteDataSetData(dataSetName,dataSetId);
          }
        }
      ]
    });
    alert.present();
  }

  deleteDataSetData(dataSetName,dataSetId){
    this.onDeleteDataSetData.emit({dataSetId : dataSetId,dataSetName:dataSetName});

  }

  viewMoreDetailsOnEntryForm(dataSetId){
    this.navCtrl.push('DataElementSyncPage',{
      syncStatus : this.syncStatus,
      dataSetId:dataSetId,
      entryFormName : this.dataSetsSyncObjects[dataSetId].name,
      dataValues : this.dataSetsSyncObjects[dataSetId].dataValues
    })
  }


  syncSelectedDataSetData(selectedDataSet,dataSetName,dataSetId){
    this.onSyncDataSetData.emit({dataValues: selectedDataSet,dataSetId : dataSetId,dataSetName:dataSetName});

  }


}
