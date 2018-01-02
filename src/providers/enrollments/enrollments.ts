import { Injectable } from '@angular/core';
import {SqlLiteProvider} from "../sql-lite/sql-lite";

declare var dhis2: any;

/*
  Generated class for the EnrollmentsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EnrollmentsProvider {

  resource : string;

  constructor(private sqlLite : SqlLiteProvider){
    this.resource = "enrollments";
  }

  /**
   *
   * @param trackedEntityId
   * @param orgUnitId
   * @param orgUnitName
   * @param programId
   * @param enrollmentDate
   * @param incidentDate
   * @param trackedEntityInstance
   * @param syncStatus
   * @param enrollment
   * @returns {Array}
   */
  getEnrollmentsPayLoad(trackedEntityId,orgUnitId,orgUnitName,programId,enrollmentDate,incidentDate,trackedEntityInstance,syncStatus,enrollment?){
    if(!enrollment){
      enrollment = dhis2.util.uid();
    }
    let payLoad = {
      "id" : enrollment,
      "trackedEntity": trackedEntityId,
      "orgUnit": orgUnitId,
      "program": programId,
      "trackedEntityInstance": trackedEntityInstance,
      "enrollment": enrollment,
      "orgUnitName": orgUnitName,
      "enrollmentDate": enrollmentDate,
      "incidentDate": incidentDate,
      "status": "ACTIVE",
      "attributes": [],
      "events": [],
      "syncStatus": syncStatus
    };
    let payLoads = [];
    payLoads.push(payLoad);
    return payLoads;
  }

  /**
   *
   * @param attribute
   * @param attributeArray
   * @param currentUser
   * @returns {Promise<any>}
   */
  getSavedEnrollmentsByAttribute(attribute,attributeArray,currentUser){
    return new Promise( (resolve, reject)=> {
      this.sqlLite.getDataFromTableByAttributes(this.resource,attribute,attributeArray,currentUser.currentDatabase).then((enrollments : any)=>{
        resolve(enrollments);
      }).catch(error=>{
        reject(error);
      })
    })
  }


  /**
   *
   * @param orgUnitId
   * @param programId
   * @param currentUser
   * @returns {Promise<any>}
   */
  getSavedEnrollments(orgUnitId,programId,currentUser){
    let enrollments = [];
    let orgUnitIds = [];
    orgUnitIds.push(orgUnitId);
    return new Promise( (resolve, reject)=> {
      this.sqlLite.getDataFromTableByAttributes(this.resource,'orgUnit',orgUnitIds,currentUser.currentDatabase).then((enrollmentResponse : any)=>{
        if(enrollmentResponse && enrollmentResponse.length > 0){
          enrollmentResponse.forEach((enrollment : any)=>{
            if(enrollment.program == programId){
              enrollments.push(enrollment);
            }
          });
          resolve(enrollments);
        }else{
          resolve(enrollments);
        }
      }).catch(error=>{
        reject({message : error});
      });
    });
  }

  /**
   *
   * @param enrollments
   * @param currentUser
   * @param status
   * @returns {Promise<any>}
   */
  updateEnrollmentsByStatus(enrollments,currentUser,status?){
    return new Promise((resolve,reject)=>{
      enrollments.forEach((enrollment : any)=>{
        if(status){
          enrollment.syncStatus = status;
        }
      });
      this.sqlLite.insertBulkDataOnTable(this.resource,enrollments,currentUser.currentDatabase).then(()=>{
        resolve();
      }).catch((error)=>{
        reject(error);
      });
    });
  }



}
