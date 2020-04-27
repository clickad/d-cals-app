import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-workouts',
  templateUrl: './add-workouts.component.html',
  styleUrls: ['./add-workouts.component.css']
})
export class AddWorkoutsComponent implements OnInit {

  public workouts: any[] = [
    {id: 1, name: "Running", dat: []},
    {id: 2, name: "Walking", dat: []},
    {id: 3, name: "Swimming", dat: []},
    {id: 4, name: "Bicycling", dat: []},
    {id: 5, name: "Jumping Rope", dat: []},
    {id: 6, name: "Football", dat: []},
    {id: 7, name: "Basketball", dat: []},
    {id: 8, name: "Tennis", dat: []},
  ];
  public formData: any;

  @Output() addWorkoutToDay: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      type: new FormControl("", Validators.compose([Validators.required])),
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
      ),
      duration: new FormControl(
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

  addWorkout(data, type){
    data.calories = Math.ceil(this.calculateCalories(data, type));
    data.workout = this.workouts[type-1].name;
    this.addWorkoutToDay.emit(data);
  }

  calculateCalories(data, type) {
    let bmr: any;
    let result: any;
    let mets: any;
    let weight = data.unit == 1 ? data.weight : data.weight*0.45359237;
    let height = data.unit == 1 ? data.height : data.height*30.48;
    switch(type){
      case 1:
        mets = 9*(data.duration/60);
      break;
      case 2:
        mets = 2.7*(data.duration/60);
      break;
      case 3:
        mets = 8.3*(data.duration/60);
      break;
      case 4:
        mets = 6.8*(data.duration/60);
      break;
      case 5:
        mets = 7.5*(data.duration/60);
      break;
      case 6:
        mets = 7.0*(data.duration/60);
      break;
      case 7:
        mets = 6.5*(data.duration/60);
      break;
      case 8:
        mets = 7.3*(data.duration/60);
      break;
    }
    if (data.gender === "1") {
      bmr = Math.round(
        10 * weight + 6.25 * height - 5 * data.age  + 5
      );
    } else {
      bmr = Math.round(
        10 * weight + 6.25 * height - 5 * data.age - 161
      );
    }
    result = bmr*mets/24;
    return result;
  }

  resetForm(){
    this.formData.patchValue({
      weight: "",
      height: ""
    });
    this.formData.markAsUntouched()
  }

  setData(){
    let data = JSON.parse(localStorage.getItem('userData'));
    this.formData.patchValue({
      unit: data.unit,
      age: data.age,
      weight: data.weight,
      height: data.height,
      gender: data.gender == "Male" ? "1" : "2"
    });
  }

}
