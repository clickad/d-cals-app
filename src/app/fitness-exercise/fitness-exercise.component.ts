import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GymWorkoutsService } from '../services/gym-workouts.service';

@Component({
  selector: 'app-fitness-exercise',
  templateUrl: './fitness-exercise.component.html',
  styleUrls: ['./fitness-exercise.component.css']
})
export class FitnessExerciseComponent implements OnInit {

  public title: string = "Workout calories burning";
  public subtitle: string = "Exercise is any bodily activity that enhances or maintains physical fitness and overall health and wellness. It is performed for various reasons, including increasing growth and development, preventing aging, strengthening muscles and the cardiovascular system, honing athletic skills, weight loss or maintenance, and also enjoyment.";

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
  public result: any;

  constructor(private gymService: GymWorkoutsService) { }

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
  }

  calculateCalories(data, type) {
    let bmr: any;
    let mets: any;
    let weight = data.unit == 1 ? data.weight : data.weight*0.45359237 ;
    let height = data.unit == 1 ? data.height : data.height*30.48 ;
    switch(type){
      case 1:
        mets = 9*(data.duration/60);
      break;
      case 2:
        mets = 4.3*(data.duration/60);
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
    this.result = (bmr*mets/24).toFixed(2);
  }

  resetForm(){
    this.formData.patchValue({
      weight: "",
      height: ""
    });
    this.formData.markAsUntouched()
  }

  // getCat() {
  //   this.gymService.getCategories().subscribe(data => {
  //     this.exercises = data['results'];
  //     this.stopLoading();
  //   });
  // }

  // stopLoading() {
  //   this.isLoading = false;
  // }

  // getData(value: string): void {
  //   this.isLoading = true;
  //   this.search = value;
  //   this.gymService.getImages(this.search).subscribe(data => {
  //     this.imagesData = data['results'];
  //   });
  //   this.gymService.getExerciseInfo(this.search).subscribe(data => {
  //     this.exerciseInfo = data['results'];
  //     this.stopLoading();
  //   });
  // }

}
