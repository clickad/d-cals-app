import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";

export interface UserData {
  age: string;
  height: string;
  weight: string;
  gender: string;
}

@Component({
  selector: 'app-user-default-values',
  templateUrl: './user-default-values.component.html',
  styleUrls: ['./user-default-values.component.css']
})

export class UserDefaultValuesComponent implements OnInit {

  public formdata: any;

  public editDialog: boolean;

  constructor(
    public dialogRef: MatDialogRef<UserDefaultValuesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData
  ) { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      unit: new FormControl("", Validators.compose([Validators.required])),
      age: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[1-9][0-9]*$")
        ])
      ),
      gender: new FormControl("", Validators.compose([Validators.required])),
      height: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("")
        ])
      ),
      weight: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[1-9][0-9]*$")
        ])
      )
    });

    if(localStorage.hasOwnProperty("userData")){
      this.setData();
    }
  }

  noThanks(): void {
    this.dialogRef.close({
      unit: 0,
      age: 0,
      height: 0,
      weight: 0,
      gender: ""
    });
  }

  cancel(){
    let data = localStorage.hasOwnProperty("userData") ? JSON.parse(localStorage.getItem('userData')) : {
      unit: 0,
      age: 0,
      height: 0,
      weight: 0,
      gender: ""
    };
    this.dialogRef.close({
      unit: data.unit,
      age: data.age,
      height: data.height,
      weight: data.weight,
      gender: data.gender
    });
  }

  resetForm(){
    this.formdata.patchValue({
      weight: "",
      height: ""
    });
    this.formdata.markAsUntouched();
  }

  setData(){
    let data = JSON.parse(localStorage.getItem('userData'));
    this.formdata.setValue({
      unit: data.unit,
      age: data.age,
      weight: data.weight,
      height: data.height,
      gender: data.gender
    });
  }

}
