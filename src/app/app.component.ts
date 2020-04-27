import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserDefaultValuesComponent } from './dialogs/user-default-values/user-default-values.component';
import {IUser} from './interfaces/iuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public userData: IUser;
  public editDialog: boolean;
  public bmi: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    //localStorage.removeItem("userData");
    localStorage.hasOwnProperty("userData") ? this.userData = JSON.parse(localStorage.getItem('userData')) : this.openDialog();
  }

  openDialog(edit=false): void {
    const dialogRef = this.dialog.open(UserDefaultValuesComponent, {
      width: '450px',
      disableClose: true,
      data: {edit: edit}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userData = result;
      if(this.userData != undefined &&  this.userData.gender != ""){
        this.saveDataToLocal(this.userData);
      }
    });
  }

  saveDataToLocal(userData){
    localStorage.setItem('userData', JSON.stringify(userData));
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  calculateBMI() {
    if(localStorage.hasOwnProperty("userData")){
      let height: any = this.userData.unit == 1 ? this.userData.height : (this.userData.height*30.48).toFixed(1);
      let weight: any = this.userData.unit == 1 ? this.userData.weight : (this.userData.weight*0.45359237).toFixed(1);
      let bmi = ((weight) / Math.pow((height) / 100, 2)).toFixed(2);
      return bmi;
    } else {
      return false;
    }
  }

  calculateCalories() {
    if(localStorage.hasOwnProperty("userData")){
      let height: any = this.userData.unit == 1 ? this.userData.height : (this.userData.height*30.48).toFixed(1);
      let weight: any = this.userData.unit == 1 ? this.userData.weight : (this.userData.weight*0.45359237).toFixed(1);
      let calories: any;
      if (this.userData.gender == "Male") {
        calories = Math.round(
          (10 * weight + 6.25 * height - 5 * this.userData.age) * 1.2 + 5
        );
      } else {
        calories = Math.round(
          (10 * weight + 6.25 * height - 5 * this.userData.age) * 1.2 - 161
        );
      }
      return calories;
    } else {
      return false;
    }
  }

  calculateOptimalWeight() {
    if(localStorage.hasOwnProperty("userData")){
      let height: any = this.userData.unit == 1 ? this.userData.height : (this.userData.height*30.48).toFixed(1);
      let resultFrom: any;
      let resultTo: any;
      let optimalWeight: any;
      if (this.userData.gender === "Male") {
        resultFrom = (18.5 * Math.pow(height / 100, 2)).toFixed(1);
        resultTo = (25 * Math.pow(height / 100, 2)).toFixed(1);
      } else {
        resultFrom = 18.5 * Math.pow(height / 100, 2);
        resultTo = 25 * Math.pow(height / 100, 2);
        resultFrom = (resultFrom - resultFrom / 10).toFixed(1);
        resultTo = (resultTo - resultTo / 10).toFixed(1);
      }
      optimalWeight = resultFrom + " kg - " + resultTo + " kg";
      return optimalWeight;
    } else {
      return false;
    }
  }

}
